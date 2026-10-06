# shellcheck shell=bash
# ==============================================================================
# Kanso Labs Home Assistant Application: NAT Gateway
# The firewall rules, shared by the service and its finish script
# ==============================================================================

# Every rule carries this comment, which is how the application finds its own
# rules again, to check them, and to remove them without touching anyone
# else's.
readonly rule_tag='nat-gateway'

# Home Assistant OS builds iptables on nftables, and Docker writes its rules
# through it. Rules written through the legacy backend would land in tables the
# host never consults, which is why Alpine's legacy package is not installed.
readonly iptables='iptables-nft'

# Docker sets the FORWARD policy to DROP, and DOCKER-USER is the chain it keeps
# for rules of the host's own, ahead of its own rules, and leaves alone when it
# rewrites the rest. Without Docker there is only FORWARD itself.
select_forward_chain() {
  if "${iptables}" -S DOCKER-USER > /dev/null 2>&1; then
    echo 'DOCKER-USER'
  else
    echo 'FORWARD'
  fi
}

# Prints one rule per line: its table, its chain, then its match and target.
# Only the device's own subnet is forwarded, and only outwards: the replies
# come back in, and nothing on the uplink can open a connection to the device.
rule_specs() {
  local chain="${1}" device="${2}" uplink="${3}" subnet="${4}"
  local comment="-m comment --comment ${rule_tag}"
  echo "filter ${chain} -i ${device} -o ${uplink} -s ${subnet} ${comment} -j ACCEPT"
  echo "filter ${chain} -i ${uplink} -o ${device} -d ${subnet} -m conntrack --ctstate RELATED,ESTABLISHED ${comment} -j ACCEPT"
  echo "nat POSTROUTING -s ${subnet} -o ${uplink} ${comment} -j MASQUERADE"
}

# Interface names and the subnet are checked before they get here, so none of
# them holds a space, and splitting each line into words is safe.
add_rules() {
  local table chain rule
  while read -r table chain rule; do
    # shellcheck disable=SC2086
    "${iptables}" -t "${table}" -I "${chain}" 1 ${rule}
  done < <(rule_specs "$@")
}

rules_present() {
  local table chain rule
  while read -r table chain rule; do
    # shellcheck disable=SC2086
    "${iptables}" -t "${table}" -C "${chain}" ${rule} 2> /dev/null || return 1
  done < <(rule_specs "$@")
}

# Removes every rule carrying the comment, whatever it matched, so rules left
# by an earlier configuration, or by a run that was killed before it could
# clean up, go as well.
remove_rules() {
  local table line
  local -a words
  for table in filter nat; do
    while read -r line; do
      read -ra words <<< "${line}"
      words[0]='-D'
      "${iptables}" -t "${table}" "${words[@]}"
    done < <("${iptables}" -t "${table}" -S 2> /dev/null \
      | grep -F -- "--comment ${rule_tag}")
  done
}

# Home Assistant Application: NAT Gateway

NAT Gateway shares this host's network connection with a device plugged straight
into one of its spare Ethernet ports. A NAS on a cable of its own is the case it
was written for: Home Assistant reaches the NAS over that cable, and the NAS
reaches the internet through Home Assistant, for its updates, its clock and its
cloud services.

A cable straight between two machines has no router on it, so nothing hands the
device an address and nothing carries its traffic further. Home Assistant gives
the port an address of its own; this application does the rest, with three
firewall rules on the host and nothing else. It has no web interface.

## Installation

1. Give the port a static address. In **Settings → System → Network**, open the
   port the device is plugged into, set IPv4 to **Static**, and give it an
   address on a subnet nothing else on your network uses, such as
   `10.0.10.1/24`. Leave the gateway and the DNS servers empty, so the host
   keeps reaching the internet the way it did. From the SSH application the same
   is:

   ```shell
   ha network update enp2s0 --ipv4-method static \
     --ipv4-address 10.0.10.1/24 --ipv6-method disabled
   ```

2. Add this repository to your Home Assistant instance.
3. Install the "NAT Gateway" application.
4. Set `interface` on its **Configuration** tab to that port.
5. Start it.
6. Set the device up as below.

## Configuration

```yaml
interface: enp2s0
```

### Option: `interface`

The Ethernet port the device is plugged into, such as `enp2s0`. The **Network**
page in Home Assistant lists the host's ports by these names.

The application reads the subnet from the address the port already has, so it is
never configured twice. A port with no IPv4 address shares nothing, and the log
says so until it has one.

### Option: `uplink`

Optional. The interface whose connection is shared. Without it, the application
uses the one carrying the host's default route, which is the right one unless
the host has more than one way out. It follows that route if it moves, from
Wi-Fi to a cable for example.

## Setting up the device

Give the device a static address on the port's subnet, with the port as its
gateway:

| Setting | Example                                     |
| ------- | ------------------------------------------- |
| Address | `10.0.10.2/24`                              |
| Gateway | `10.0.10.1`, the port's own address         |
| DNS     | your router's address, or a public resolver |

The application hands out no addresses, so a device left to ask for one gets
none. Set the address on the device while it is still on your ordinary network,
then move its cable to the port.

## What it allows

- **The device can open connections** to anything the uplink reaches: the
  internet, and the rest of your network too. Its traffic leaves under the
  host's own address.
- **Nothing on the uplink can open a connection to the device.** Only the
  replies to the device's own connections come back in. Reaching the device from
  another computer means going through something that runs on this host, such as
  a reverse proxy.
- **Home Assistant and its applications reach the device either way**, with or
  without this application. Their traffic starts on this host, so it needs no
  forwarding, and a network share mounted in **Settings → System → Storage**
  keeps working when this application stops.

Only IPv4 is shared.

## How it works

The application runs in the host's network namespace, because the rules belong
to the host's own firewall. It writes three:

- an accept rule for traffic from the device's subnet, in through the port and
  out through the uplink;
- an accept rule for the replies, the other way;
- a masquerade rule, so the device's traffic leaves under the uplink's address.

Docker sets the host's `FORWARD` policy to drop, and keeps a chain called
`DOCKER-USER` for rules of the host's own, ahead of its own rules. The two
accept rules go there. Each rule carries the comment `nat-gateway`, which is how
the application finds its own again without touching anyone else's.

Every thirty seconds it reads the port's address and the uplink again, and puts
back any rule that has gone, after a Docker restart for example. When it stops,
it removes its rules, and the device loses its connection until it starts again.
Rules left behind by an application that was killed outright are removed the
next time it starts.

## Storage

Nothing is mapped. The options are kept by Supervisor, and the rules are written
again from them every time the application starts.

## Backups

Backups are taken hot. There is no state to catch part way through a write.

## Updates

iptables comes from Alpine's package, and its version is pinned so that a new
one arrives as a release of this application rather than silently. Alpine
currently ships iptables 1.8.13.

## Why this starts at 0.1.0

Most applications in this repository start at `1.0.0`. This one does not,
because it has only been built and booted against a test interface in Docker
Desktop, where it wrote its rules, put back one that was deleted, and removed
them all on stop. It has not yet carried a device's traffic on a Home Assistant
host.

It moves to `1.0.0` once it has shared a connection on a real instance without
surprises.

## Support

Open an issue on the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).

## Credits

This packaging is new rather than a port. Its shape follows the other
applications in this repository. The idea of sharing the host's connection from
an application comes from
[eximius313/ha-wifi-gateway-addon](https://github.com/eximius313/ha-wifi-gateway-addon),
which takes the port away from Home Assistant and runs a DHCP server on it; this
application leaves the port to Home Assistant and writes only the rules.

iptables is developed by the [netfilter project](https://www.netfilter.org/) and
is licensed under the GPL-2.0.

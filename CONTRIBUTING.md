# Contributing

We are open to, and grateful for, any contributions made by the community. By
contributing to this project, you agree to abide by the
[code of conduct](https://github.com/kanso-labs/home-assistant-applications/blob/main/CODE_OF_CONDUCT.md).

## Reporting Issues and Asking Questions

Before opening an issue, please search the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues)
to make sure your issue hasn't already been reported.

## Development

Visit the
[issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues)
to find a list of open issues that need attention.

Fork, then clone the repo:

```shell
git clone https://github.com/your-username/home-assistant-applications.git
```

### New Features

Please open an issue with a proposal for a new feature or refactoring before
starting on the work. We don't want you to waste your efforts on a pull request
that we won't want to accept.

### Workflow naming

A workflow's filename is the kebab-case of its `name:` field. Reusable
workflows, meaning those triggered only by `workflow_call`, take a leading
underscore so that entry points and building blocks separate visually in the
folder listing.

| `name:`             | Trigger                            | Filename                  |
| ------------------- | ---------------------------------- | ------------------------- |
| `Build`             | `push`, `pull_request`             | `build.yaml`              |
| `Lint`              | `push`, `pull_request`, `schedule` | `lint.yaml`               |
| `Build application` | `workflow_call`                    | `_build-application.yaml` |

Within a workflow, a job name is an imperative verb phrase with any matrix
values appended, and a step name is an imperative verb phrase in sentence case.
Job ids, step ids, and matrix keys are not held to this, since renaming them
means updating every `needs.*` and `steps.*` reference for no visible benefit.

`build.yaml` matches its own filename in a regular expression, so renaming
either build workflow means updating that pattern too.

## Submitting Changes

- Open a new issue in the
  [Issue tracker](https://github.com/kanso-labs/home-assistant-applications/issues).
- Fork the repo.
- Create a new feature branch based off the `main` branch.
- Make sure all tests pass and there are no linting errors.
- Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including
unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon
as possible. We may suggest some changes or improvements.

Thank you for contributing!

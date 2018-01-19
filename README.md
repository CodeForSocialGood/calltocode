# Call to Code

[![travis][travis]][travis-url]
[![test][test]][test-url]
[![prod][prod]][prod-url]
![nonprofit][nonprofit]

![logo][logo]

> Platform where college students can get development experience by working with nonprofits.

## Getting Started

:wave: Want to contribute to this project? Follow these steps to get started:

- **:computer: Environment Setup**: First, you're going to want to make sure your development environment is properly set up. Go ahead and read through our [development environment setup](docs/DEVELOPER.md) guide.

- **:pencil2: Contribute**: Once you're set up, you're ready to become a contributor. Make sure you read our [contributing guidelines](docs/CONTRIBUTING.md) before you start working on a story so that you can learn our workflows.

- **:european_castle: Project Architecture**: We've put together an [architecture guide](docs/ARCHITECTURE.md) to serve as a reference and help reduce the time it takes to familiarize yourself with this project's architecture and codebase.

- **:raising_hand: Questions & Problems**: If you're stuck on something, don't be afraid to ask around in [Slack](http://join-our-slack.code4socialgood.org/)! You can also check out our list of [common problems](docs/PROBLEMS.md) to see if your issue is addressed there.

## Additional Information

Below is a cheatsheet for the scripts that can be found in `package.json`:

```bash
$ yarn                              # Install dependencies (npm install)
$ yarn start                        # Start all docker containers and app on port 3000 and on port 3001 via https w/ watch mode (npm start)
$ yarn stop                         # Stop all docker containers (npm stop)
$ yarn restart                      # Restart all docker containers and app (npm restart)
$ yarn test                         # Run linter, test build, and tests (npm test)
$ yarn lint                         # Run linter (npm run lint)
$ yarn db start                     # Start docker container with seeded MongoDB (npm run db -- start)
$ yarn db stop                      # Stop docker container with MongoDB (npm run db -- stop)
$ yarn email start                  # Start docker container with MailHog (npm run email -- start)
$ yarn email stop                   # Stop docker container with MailHog (npm run email -- stop)
$ yarn build                        # Generate distribution (npm run build)
```

*Although yarn is recommended, you may also use npm natively. The corresponding npm commands are in parenthesis above.*

[travis]: https://travis-ci.org/CodeForSocialGood/calltocode.org.svg
[travis-url]: https://travis-ci.org/CodeForSocialGood/calltocode.org

[test]: https://img.shields.io/badge/test-test.calltocode.org-orange.svg
[test-url]: https://test.calltocode.org

[prod]: https://img.shields.io/badge/prod-calltocode.org-orange.svg
[prod-url]: https://calltocode.org

[nonprofit]: https://img.shields.io/badge/project-nonprofit-ff69b4.svg

[logo]: /docs/media/logo.png

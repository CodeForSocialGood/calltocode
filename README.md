# Call to Code

[![travis][travis]][travis-url]
[![test][test]][test-url]
[![prod][prod]][prod-url]
![nonprofit][nonprofit]

![logo][logo]

> Platform where college students can get development experience by working with nonprofits.

## Getting Started

👋 Want to contribute to this project? Follow these steps to get started:

- **💻 Environment Setup**: First, you're going to want to make sure your development environment is properly set up. Read through our [development environment setup](docs/DEVELOPER.md) guide.

- **✏️ Contribute**: Once you're set up, you're ready to become a contributor. Make sure you read our [contributing guidelines](docs/CONTRIBUTING.md) before you start working!

- **🙋 Ask Questions**: If you're stuck on something, don't be afraid to ask around in [Slack](http://join-our-slack.code4socialgood.org/)! You can also check out our list of [common problems](docs/PROBLEMS.md) to see if your issue is addressed there.

## Additional Information

Below is a cheatsheet for the scripts that can be found in `package.json`:

```bash
$ yarn                            # install dependencies (npm install)
$ yarn db                         # stop mongodb and seed db (npm run db)
$ yarn start:dev                  # run in watch mode (npm run start:dev)
$ yarn start                      # run the app through docker just like the test environment (npm start)
$ yarn stop                       # stop and clean the app that was running through docker (npm stop)
$ yarn test                       # run tests (npm test)
$ yarn build                      # generate client distribution (npm run build)
```
*Although yarn is recommended, you may also use npm natively. The corresponding npm commands are in parenthesis above.*

[travis]: https://travis-ci.org/CodeForSocialGood/calltocode.org.svg
[travis-url]: https://travis-ci.org/CodeForSocialGood/calltocode.org

[test]: https://img.shields.io/badge/test-test.calltocode.org-orange.svg
[test-url]: http://test.calltocode.org/

[prod]: https://img.shields.io/badge/prod-calltocode.org-orange.svg
[prod-url]: http://calltocode.org/

[nonprofit]: https://img.shields.io/badge/project-nonprofit-ff69b4.svg

[logo]: /docs/media/logo.png

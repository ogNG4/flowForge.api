<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

```

├─ .husky
│  └─ _
│     ├─ .gitignore
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ .prettierignore
├─ .prettierrc
├─ lint-staged.config.js
├─ nest-cli.json
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
├─ sql-migrations
│  └─ 300120241945_init.sql
├─ src
│  ├─ app.controller.spec.ts
│  ├─ app.controller.ts
│  ├─ app.module.ts
│  ├─ app.service.ts
│  ├─ configuration
│  │  ├─ env.schema.ts
│  │  └─ typeorm.config.ts
│  ├─ constans
│  │  ├─ common.ts
│  │  └─ domain.ts
│  ├─ entities
│  │  ├─ base.entity.ts
│  │  └─ index.ts
│  ├─ main.ts
│  ├─ middlewares
│  │  ├─ auth.middleware.ts
│  │  └─ index.ts
│  ├─ migrations
│  │  ├─ 1730233180019-init.ts
│  │  ├─ 1732729185415-projects.ts
│  │  ├─ 1732731045674-projectsImprovements.ts
│  │  ├─ 1732969118368-taskImprovements.ts
│  │  ├─ 1732971827720-taskImprovements2.ts
│  │  ├─ 1734789518592-addTimeLog.ts
│  │  ├─ 1734796160508-estiamtedTime.ts
│  │  ├─ 1734859557526-addBackglog.ts
│  │  └─ 1734882428349-addSprints.ts
│  ├─ modules
│  │  ├─ business
│  │  │  ├─ authUserData
│  │  │  │  ├─ authUserData.module.ts
│  │  │  │  ├─ controllers
│  │  │  │  │  ├─ auth.controller.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ user.contoller.ts
│  │  │  │  ├─ db
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ user.entity.ts
│  │  │  │  ├─ services
│  │  │  │  │  ├─ auth.service.ts
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  └─ user.service.ts
│  │  │  │  └─ types
│  │  │  │     ├─ dto
│  │  │  │     │  ├─ signIn.dto.ts
│  │  │  │     │  └─ verifyAccount.dto.ts
│  │  │  │     ├─ index.ts
│  │  │  │     └─ inputDto
│  │  │  │        ├─ createAccount.input.dto.ts
│  │  │  │        └─ signIn.input.dto.ts
│  │  │  ├─ organization
│  │  │  │  ├─ controllers
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ organization.controller.ts
│  │  │  │  │  └─ organizationMember.controller.ts
│  │  │  │  ├─ db
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ organization.entity.ts
│  │  │  │  │  ├─ organizationInvitation.entity.ts
│  │  │  │  │  └─ organizationMember.entity.ts
│  │  │  │  ├─ organization.module.ts
│  │  │  │  ├─ repositories
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ organization.repository.ts
│  │  │  │  │  └─ organizationMember.repository.ts
│  │  │  │  ├─ services
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ organization.service.ts
│  │  │  │  │  └─ organizationMembers.service.ts
│  │  │  │  └─ types
│  │  │  │     ├─ dto
│  │  │  │     │  ├─ organizationMember.dto.ts
│  │  │  │     │  └─ userOrganization.dto.ts
│  │  │  │     ├─ index.ts
│  │  │  │     └─ inputDto
│  │  │  │        ├─ createOrganization.input.dto.ts
│  │  │  │        └─ organizationMember.input.dto.ts
│  │  │  └─ project
│  │  │     ├─ controllers
│  │  │     │  ├─ project.controller.ts
│  │  │     │  ├─ projectBoard.controller.ts
│  │  │     │  ├─ projectColumn.controller.ts
│  │  │     │  ├─ projectSprint.controller.ts
│  │  │     │  ├─ projectTask.controller.ts
│  │  │     │  └─ taskController.ts
│  │  │     ├─ db
│  │  │     │  ├─ index.ts
│  │  │     │  ├─ project.entity.ts
│  │  │     │  ├─ projectColumn.entity.ts
│  │  │     │  ├─ projectSprint.entity.ts
│  │  │     │  ├─ projectTask.entity.ts
│  │  │     │  └─ taskTimeLog.entity.ts
│  │  │     ├─ project.module.ts
│  │  │     ├─ repositories
│  │  │     │  ├─ project.repository.ts
│  │  │     │  ├─ projectColumn.repository.ts
│  │  │     │  ├─ projectSprint.repository.ts
│  │  │     │  ├─ projectTask.repository.ts
│  │  │     │  └─ taskTimeLog.repository.ts
│  │  │     ├─ services
│  │  │     │  ├─ project.service.ts
│  │  │     │  ├─ projectBoard.service.ts
│  │  │     │  ├─ projectColumn.service.ts
│  │  │     │  ├─ projectSprint.service.ts
│  │  │     │  └─ projectTask.service.ts
│  │  │     └─ types
│  │  │        ├─ dto
│  │  │        │  ├─ boardTaskDto.ts
│  │  │        │  ├─ newestTaskDto.ts
│  │  │        │  ├─ project.dto.ts
│  │  │        │  ├─ projectBoard.dto.ts
│  │  │        │  ├─ projectColumn.dto.ts
│  │  │        │  ├─ projectColumnWithTasksDto.ts
│  │  │        │  ├─ sprint.dto.ts
│  │  │        │  ├─ taskAssignedUser.dto.ts
│  │  │        │  ├─ taskDetailsDto.ts
│  │  │        │  └─ taskTimeLogDto.ts
│  │  │        └─ inputDto
│  │  │           ├─ addTaskToSprint.input.dto.ts
│  │  │           ├─ createProject.input.dto.ts
│  │  │           ├─ createSprint.input.dto.ts
│  │  │           ├─ createTask.input.dto.ts
│  │  │           ├─ taskTimeLog.input.dto.ts
│  │  │           ├─ updateSprint.input.dto.ts
│  │  │           ├─ updateTask.input.dto.ts
│  │  │           └─ updateTaskColumn.input.dto.ts
│  │  └─ utils
│  │     ├─ .keep
│  │     ├─ auth
│  │     │  ├─ tools
│  │     │  │  ├─ index.ts
│  │     │  │  └─ userClaims.decorator.ts
│  │     │  └─ types
│  │     │     └─ token.ts
│  │     ├─ common
│  │     │  ├─ common.module.ts
│  │     │  ├─ common.service.ts
│  │     │  └─ index.ts
│  │     ├─ index.ts
│  │     ├─ mail
│  │     │  ├─ mail.module.ts
│  │     │  ├─ services
│  │     │  │  └─ mail.service.ts
│  │     │  ├─ templates
│  │     │  │  └─ email-template.hbs
│  │     │  └─ types
│  │     │     └─ mailOptions.ts
│  │     └─ utils.module.ts
│  └─ types
│     └─ domain.ts
├─ test
│  ├─ app.e2e-spec.ts
│  └─ jest-e2e.json
├─ tsconfig.build.json
└─ tsconfig.json

```

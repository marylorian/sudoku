# Sudoku Levels

A React Native Sudoku app built with Expo and TypeScript.

## Levels

The app includes nine playable levels:

- 4 x 4 board with numbers 1-4: easy, medium, hard
- 6 x 6 board with numbers 1-6: easy, medium, hard
- 9 x 9 board with numbers 1-9: easy, medium, hard

## Scripts

- `npm run start` starts Expo.
- `npm run web` starts the web build used by Cypress.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run test` runs Jest tests.
- `npm run e2e` exports the web build and runs Cypress accessibility and level tests.
- `npm run build:android` builds the Android production artifact on Expo with EAS.
- `npm run build:ios` builds the iOS production artifact on Expo with EAS.
- `npm run build:stores` builds Android and iOS production artifacts on Expo with EAS.
- `npm run submit:android` submits the latest Android EAS build.
- `npm run submit:ios` submits the latest iOS EAS build.
- `npm run submit:stores` submits the latest Android and iOS EAS builds.
- `npm run publish:android` builds and submits Android with EAS.
- `npm run publish:ios` builds and submits iOS with EAS.
- `npm run publish:stores` builds and submits both stores.

## Store Setup

Before publishing, run `npm run eas -- init` to create or link the Expo project. EAS will add the project id to `app.json` after linking. Update the bundle/package identifiers if needed.

Run `npm run eas -- login` and configure credentials with `npm run eas -- credentials` before the first store submission.

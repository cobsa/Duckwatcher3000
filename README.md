# DuckWatcher 3000

Advance assignment to summer job opening for Vincit Oy

## Short summary of project and used techniques

Project is made using React, react-router, redux and numerous support libraries to handle dateTime,
alerts, localization and cookies. In addition to required tasks, filtering the sightings and
localization support was implemented. Prettier and eslint was used to assure constant code styling
through out the project.

Unit tests were made using Enzyme, Jest and Sinon. Main focus of the unit test were reducer and
components that contain logic.

## Development decisions

1. Species are not translated, since data for species is coming from backend and the translations
   should also be there.

## Installing

Clone repository

```
git clone https://github.com/cobsa/Duckwatcher3000.git
```

Install dependencies

```
yarn or npm install
```

Setup backend information in /src/redux/constants/backend.js

Run front end and back end.

```
yarn run dev or npm run dev
```

## Running the tests

Project comes with unit tests for the core components.

Run tests

```
yarn run test or npm run test
```

## Built With

* [Moment](https://github.com/moment/moment) - Handle date formats
* [Axios](https://github.com/axios/axios) - Making REST calls
* [react-localize-redux](https://github.com/ryandrewjohnson/react-localize-redux) - Used to implement localization
* [react-s-alert](https://github.com/juliancwirko/react-s-alert) - Used to show alerts for user
* [react-datetime](https://github.com/YouCanBookMe/react-datetime) - Used to pick date&time

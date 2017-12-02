# DuckWatcher 3000

Advance assignment to summer job opening for Vincit Oy

## Short summary of project and used techniques

Project is made using React, react-router, redux and numerous support libraries to handle dateTime,
alerts, localization and cookies. In addition to required tasks, filtering the sightings and
localization support was implemented. Prettier and eslint was used to assure constant code styling
trough out the project.

Unit tests were made using Enzyme, Jest and Sinon. Main focus of the unit test were reducer and
components that contain logic.

## Development decisions

1. Species are not translated, since data for species is coming from backend and the translations
   should also be there.
2.

## Installing

Clone repository

```
git clone https://github.com/cobsa/Duckwatcher3000.git
```

Install dependencies

```
yarn or npm install
```

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

* [Moment](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Axios](https://maven.apache.org/) - Dependency Management
* [react-localize-redux](https://rometools.github.io/rome/) - Used to generate RSS Feeds
* [react-s-alert]() -
* [react-datetime]() -

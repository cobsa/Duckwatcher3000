/* eslint-disable no-unused-vars */
import { put, call } from 'redux-saga'
import axios from 'axios'

import { updateSightings } from '../../redux/sagas/sagas'

test.skip('Should make axios call to update sightings', () => {
  const gen = updateSightings()
  expect(gen.next()).toEqual()
})

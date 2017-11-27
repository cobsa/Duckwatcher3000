import { put, call } from 'redux-saga'
import axios from 'axios'

import { updateSightings } from '../../redux/sagas/sagas'

test('Should make axios call to update sightings', () => {
  const gen = updateSightings()
  expect(gen.next()).toEqual()
})

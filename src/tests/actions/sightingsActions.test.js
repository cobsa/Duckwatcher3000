import * as actions from '../../redux/actions/sightingsActions'
import { access } from 'fs'
import { UPDATEALL } from '../../redux/constants/sightings'

test('Should start updating all by sending FETHCING', () => {
  expect(actions.updateAll()).toEqual({
    type: UPDATEALL
  })
})

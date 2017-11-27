// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import moment from 'moment'

import Sighting from '../../components/table/row'

Enzyme.configure({ adapter: new Adapter() })
const props = {
  id: 666,
  species: 'Mallard',
  description: 'Lorem ipsum',
  count: 5,
  dateTime: '2016-12-24T13:12:00Z'
}

test('Sighting renders props correctly', () => {
  const sighting = shallow(<Sighting {...props} />)
  expect(sighting.find('th')).toHaveLength(4)
  expect(
    sighting
      .find('th')
      .at(2)
      .text()
  ).toBe('Mallard')
  expect(
    sighting
      .find('th')
      .at(1)
      .text()
  ).toBe(props.description)
  expect(
    sighting
      .find('th')
      .at(3)
      .text()
  ).toBe(props.count.toString())
  expect(
    sighting
      .find('th')
      .first()
      .text()
  ).toBe(moment(props.dateTime).format('DD/MM/YYYY HH:mm:ss')) // Shows time in local time
})

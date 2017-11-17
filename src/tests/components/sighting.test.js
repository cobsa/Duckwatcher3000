// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'


import Sighting from '../../components/sighting'

Enzyme.configure({ adapter: new Adapter() })
const props = {
  id: 666,
  species: 'Mallard',
  description: 'Lorem ipsum',
  count: 5,
  dateTime: '2016-12-12T10:10:00Z'
}

test('Sighting renders props correctly', () => {
  const sighting = shallow(<Sighting {...props} />)
  expect(sighting.find('th')).toHaveLength(4)
  expect(
    sighting
      .find('th')
      .first()
      .text()
  ).toBe('Mallard')
})

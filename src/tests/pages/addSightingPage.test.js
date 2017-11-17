// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AddSighting from '../../pages/addSighting'

Enzyme.configure({ adapter: new Adapter() })

test('Add Sighting Page renders', () => {
  const page = shallow(<AddSighting />)
  expect(page.exists()).toBeTruthy()
})

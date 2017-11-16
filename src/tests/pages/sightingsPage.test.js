import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AddSighting from '../../pages/sightings'

Enzyme.configure({ adapter: new Adapter() })

test('Sightings Page renders', () => {
  const page = shallow(<AddSighting />)
  expect(page.exists()).toBeTruthy()
})

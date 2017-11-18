// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import AddSighting from '../../pages/addSighting'

Enzyme.configure({ adapter: new Adapter() })

test('Add Sighting Page renders', () => {
  const page = shallow(<AddSighting />)
  expect(page.exists()).toBeTruthy()
})

test('Changing description will trigger method', () => {
  const handleDescriptionSpy = sinon.spy(AddSighting.prototype, 'handleDescription')
  const page = mount(<AddSighting />)
  page.update()
  expect(page.find('#inputDescription')).toHaveLength(1)
  page.find('#inputDescription').simulate('change')
  expect(handleDescriptionSpy.calledOnce).toEqual(true)
})

// TODO: Works with shallow but not with mount. WHYYYY?
test('Changing date picker will trigger method', () => {
  const handleDateTimeChangeSpy = sinon.spy(AddSighting.prototype, 'handleDateTimeChange')
  const page = shallow(<AddSighting />)
  page.update()
  expect(page.find(DatePicker)).toHaveLength(1)
  page.find(DatePicker).simulate('change')
  expect(handleDateTimeChangeSpy.calledOnce).toEqual(true)
})

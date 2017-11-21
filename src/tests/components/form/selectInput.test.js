// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SelectInput from '../../../components/form/selectInput'

Enzyme.configure({ adapter: new Adapter() })

test('Component class name is default if props.valid is undefined', () => {
  const input = shallow(<SelectInput valid={undefined} />)
  expect(input.find('select').hasClass('form-control')).toEqual(true)
})

test('Invalid class name when valid is false', () => {
  const input = shallow(<SelectInput valid={false} />)
  expect(input.find('select').hasClass('form-control')).toEqual(true)
  expect(input.find('select').hasClass('is-invalid')).toEqual(true)
})

test('Valid class name when valid is true', () => {
  const input = shallow(<SelectInput valid={true} />)
  expect(input.find('select').hasClass('form-control')).toEqual(true)
  expect(input.find('select').hasClass('is-valid')).toEqual(true)
})

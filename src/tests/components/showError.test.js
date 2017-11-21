// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
// Individual test imports
import { ShowErrorComponent, Error } from '../../components/showError'

Enzyme.configure({ adapter: new Adapter() })

test('Should return null if message is empty', () => {
  const error = mount(<Error message={undefined} />)
  expect(error.isEmptyRender()).toEqual(true)
})

test('Should render the error message', () => {
  const errorMessage = 'Some error message'
  const error = mount(<Error message={errorMessage} />)
  expect(error.find('div').text()).toEqual('Some error message×')
})

test('Show error component should render both error components', () => {
  const showErrors = shallow(<ShowErrorComponent />)
  expect(showErrors.find(Error).length).toEqual(2)
})

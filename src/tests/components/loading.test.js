// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
/* eslint-disable no-unused-vars */
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Loading from '../../components/common/loading'

Enzyme.configure({ adapter: new Adapter() })

test('Component renders', () => {
  const loading = shallow(<Loading />)
  expect(loading.exists()).toBe(true)
})

// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
/* eslint-disable no-unused-vars */
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import moment from 'moment'
// Individual test imports
import { Redirect } from 'react-router-dom'
// Custom components
import { SightingsComponent } from '../../pages/sightings'
import Empty from '../../components/table/empty'
import Filter from '../../components/filterComponent'
import Loading from '../../components/loading'

Enzyme.configure({ adapter: new Adapter() })
let sightingsInitial = {
  status: {
    code: 'NOT_FETCHED',
    message: undefined
  },
  order: {
    column: 'dateTime',
    direction: 'ASCENDING'
  },
  filter: {
    column: undefined,
    filterArguments: {
      filterQuery: undefined,
      startTime: undefined,
      endTime: undefined
    }
  },
  sightings: []
}
let sightingsInitialNoData = Object.assign({}, sightingsInitial, {
  status: {
    code: 'FETCHED'
  }
})

test('Should render page', () => {
  const page = shallow(
    <SightingsComponent
      sightings={sightingsInitial}
      updateSightings={sinon.spy()}
      translate={sinon.spy()}
    />
  )
  expect(page.exists()).toBeTruthy()
})
test('Should render empty component', () => {
  const page = shallow(
    <SightingsComponent
      sightings={sightingsInitialNoData}
      updateSightings={sinon.spy()}
      translate={sinon.spy()}
    />
  )
  expect(page.find(Empty).length).toEqual(1)
})
test('Should render filter component', () => {
  const page = shallow(
    <SightingsComponent
      sightings={sightingsInitialNoData}
      updateSightings={sinon.spy()}
      translate={sinon.spy()}
    />
  )
  expect(page.find(Filter).length).toEqual(1)
})
test('Should render loading component', () => {
  const page = shallow(
    <SightingsComponent
      sightings={sightingsInitial}
      updateSightings={sinon.spy()}
      translate={sinon.spy()}
    />
  )
  expect(page.find(Loading).length).toEqual(1)
})

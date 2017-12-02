// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
/* eslint-disable no-unused-vars */
import raf from '../../../__mocks__/raf'

import React from 'react'
import Enzyme from 'enzyme'
import { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'

import { FilterComponent } from '../../components/filterComponent'
import SelectInput from '../../components/form/selectInput'

Enzyme.configure({ adapter: new Adapter() })

let speciesInitial = {
  status: {
    code: 'FETCHED',
    message: undefined
  },
  species: [
    {
      name: 'mallard'
    },
    {
      name: 'redhead'
    },
    {
      name: 'gadwall'
    },
    {
      name: 'canvasback'
    },
    {
      name: 'lesser scaup'
    }
  ]
}

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

test('Should render component', () => {
  const page = shallow(
    <FilterComponent
      species={speciesInitial}
      sightings={sightingsInitial}
      translate={sinon.spy()}
      getLanguage={'en'}
      updateSpecies={sinon.spy()}
      setFilter={sinon.spy()}
      resetFilter={sinon.spy()}
    />
  )
  expect(page.exists()).toBeTruthy()
})

test('Should call resetFilters()', () => {
  let resetFilterSpy = sinon.spy()
  const page = mount(
    <FilterComponent
      species={speciesInitial}
      sightings={sightingsInitial}
      translate={sinon.spy()}
      getLanguage={'en'}
      updateSpecies={sinon.spy()}
      setFilter={sinon.spy()}
      resetFilter={resetFilterSpy}
    />
  )
  const button = page.find('.btn-clear-filter')
  button.props().onClick({ preventDefault: sinon.spy() }) // Click button
  expect(resetFilterSpy.calledOnce).toBeTruthy()
})

test('Should call setFilter', () => {
  const setFilterSpy = sinon.spy()
  const page = shallow(
    <FilterComponent
      species={speciesInitial}
      sightings={sightingsInitial}
      translate={sinon.spy()}
      getLanguage={'en'}
      updateSpecies={sinon.spy()}
      setFilter={setFilterSpy}
      resetFilter={sinon.spy()}
    />
  )
  const select = page.find(SelectInput)
  select.props().onChange({
    target: {
      value: 'mallard'
    }
  })
  expect(setFilterSpy.calledOnce).toBeTruthy()
})

test('Should call resetFilter', () => {
  const resetFilterSpy = sinon.spy()
  const page = shallow(
    <FilterComponent
      species={speciesInitial}
      sightings={sightingsInitial}
      translate={sinon.spy()}
      getLanguage={'en'}
      updateSpecies={sinon.spy()}
      setFilter={sinon.spy()}
      resetFilter={resetFilterSpy}
    />
  )
  const select = page.find(SelectInput)
  select.props().onChange({
    target: {
      value: '13'
    }
  })
  expect(resetFilterSpy.calledOnce).toBeTruthy()
})

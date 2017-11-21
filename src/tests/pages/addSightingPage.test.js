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
// Individual test imports
import { Redirect } from 'react-router-dom'

import { AddSightingComponent } from '../../pages/addSighting'
import Loading from '../../components/loading'

Enzyme.configure({ adapter: new Adapter() })

let speciesInitial = {
  fetching: false,
  fetched: false,
  error: undefined,
  species: []
}

test('Add Sighting Page renders', () => {
  const page = shallow(<AddSightingComponent species={speciesInitial} getSpecies={sinon.spy()} />)
  expect(page.exists()).toBeTruthy()
})

test('Should render Loading component', () => {
  const page = shallow(<AddSightingComponent species={speciesInitial} getSpecies={sinon.spy()} />)
  expect(page.find(Loading).length).toEqual(1)
})

test('Should render normal state ie. not loading component', () => {
  let initialDataLoaded = {
    fetching: false,
    fetched: true,
    error: undefined,
    species: []
  }
  const page = shallow(
    <AddSightingComponent species={initialDataLoaded} getSpecies={sinon.spy()} />
  )
  expect(page.find(Loading).length).toEqual(0)
})

test('Should render Redirect component', () => {
  let initialDataLoaded = {
    fetching: false,
    fetched: true,
    error: undefined,
    species: []
  }
  const page = shallow(
    <AddSightingComponent species={initialDataLoaded} getSpecies={sinon.spy()} />
  )
  page.setState({
    redirect: true
  })
  expect(page.find(Redirect).length).toEqual(1)
})

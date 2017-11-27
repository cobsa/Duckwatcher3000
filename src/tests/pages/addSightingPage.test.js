// TODO: Remove this `raf` polyfill once the below issue is sorted
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
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
import { AddSightingComponent } from '../../pages/addSighting'
import Loading from '../../components/loading'
import TextInput from '../../components/form/textInput'
import SelectInput from '../../components/form/selectInput'
import DatePicker from '../../components/form/dateTimePicker'

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

test('Should send valid user input data to addSighting method', () => {
  let initialSpeciesData = {
    fetching: false,
    fetched: true,
    error: undefined,
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
  // Create and attach Spy to addSighting function
  const addSightingSpy = sinon.spy()
  const page = shallow(
    <AddSightingComponent
      species={initialSpeciesData}
      getSpecies={sinon.spy()}
      addSighting={addSightingSpy}
    />
  )
  const textInputs = page.find(TextInput)
  const countInput = textInputs.find({ name: 'Count' })
  // Hack because .simulate('change') doesn't work
  countInput.props().onChange({ target: { value: 10 }, preventDefault: sinon.spy() })
  expect(page.state().count.valid).toBeTruthy()
  const descriptionInput = textInputs.find({ name: 'Description' })
  // Hack because .simulate('change') doesn't work
  descriptionInput
    .props()
    .onChange({ target: { value: 'Some description' }, preventDefault: sinon.spy() })
  expect(page.state().description.valid).toBeTruthy()
  const speciesInput = page.find(SelectInput)

  // Hack because .simulate('change') doesn't work
  speciesInput.props().onChange({ target: { value: 'gadwall' }, preventDefault: sinon.spy() })
  expect(page.state().species.valid).toBeTruthy()

  // Test dateTime and use fixed date instead of now
  const datePicker = page.find(DatePicker)
  datePicker.props().handleDateTimeChange(moment('2016-12-12T23:10:00')) // Manually trigger onBlur
  expect(page.state().dateTime.valid).toBeTruthy()
  // Handle submit
  page
    .find('form')
    .props()
    .onSubmit({ preventDefault: sinon.spy() })
  expect(addSightingSpy.calledOnce).toBeTruthy()
  expect(addSightingSpy.args).toEqual([
    [
      'gadwall',
      moment('2016-12-12T23:10:00')
        .utc()
        .format('YYYY-MM-DDTHH:mm:ss') + 'Z',
      'Some description',
      10
    ]
  ])
})

import { internalStack } from '@internalstack/server'
import dummyData from './dummy-data.json'
import { chunk, capitalize } from 'lodash-es'

const server = await internalStack(process.env.INTERNALSTACK_API_KEY as string)

server.statefulSession(async(io, { user, sessionId }) => {
  console.log(sessionId, user)
  const allComponents = {
    ...io.input,
    ...io.display,
   }
  type FieldTypes = keyof typeof allComponents
  const componentNames = Object.keys(allComponents) as Array<FieldTypes>
  while (true) {
    const componentChoice = await io.input.select<FieldTypes>('Choose a component to render', componentNames.map(componentName => ({
      label: capitalize(componentName),
      value: componentName,
    })), {
      placeholder: 'Pick a component to render'
    })
    if (componentChoice === 'address') {
      await io.input.address('Enter an address', process.env.GOOGLE_MAPS_API_KEY as string)
    }
    if (componentChoice === 'autocomplete') {
      await io.input.autocomplete('Search for an employee', async (input: string) => {
        const matchingRecords = dummyData.filter(row => row.email.startsWith(input))
        return matchingRecords.slice(0, 10).map(result => ({
          label: `${result.email} - ${result.fullName}`,
          value: result,
        }))
      })
    }
    if (componentChoice === 'checkbox') {
      await io.input.checkbox('Initiate self-destruct sequence?')
    }
    if (componentChoice === 'checkboxes') {
      await io.input.checkboxes('Pick colors', [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' }
      ])
    }
    if (componentChoice === 'colorpicker') {
      await io.input.colorpicker('Pick a color', {
        inline: true,
      })
    }
    if (componentChoice === 'currency') {
      await io.input.currency('Product price')
    }
    if (componentChoice === 'date') {
      await io.input.date('Date to search')
    }
    if (componentChoice === 'datetimeLocal') {
      await io.input.datetimeLocal('Appointment start datetime')
    }
    if (componentChoice === 'email') {
      await io.input.email('Email')
    }
    if (componentChoice === 'markdown') {
      await io.input.markdown('Enter your report')
    }
    if (componentChoice === 'number') {
      await io.input.number('How many items to reorder?')
    }
    if (componentChoice === 'radio') {
      await io.input.radio('Pick a color', [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' }
      ])
    }
    if (componentChoice === 'richText') {
      await io.input.richText('Blog post')
    }
    if (componentChoice === 'select') {
      await io.input.select('Pick a color', [
        { label: 'Red', value: 'red' },
        { label: 'Blue', value: 'blue' },
        { label: 'Green', value: 'green' }
      ])
    }
    if (componentChoice === 'slider') {
      await io.input.slider('Estimate business size')
    }
    if (componentChoice === 'table') {
      await io.input.table('Clients', async ({ query, page }) => {
        const matchingRecords = dummyData.filter(row => row.email.startsWith(query))
        return {
          totalResults: matchingRecords.length,
          resultsToDisplay: chunk(matchingRecords, 10)[page - 1]
        }
      }, {
        resultsPerPage: 10
      })
    }
    if (componentChoice === 'text') {
      await io.input.text('Enter your name')
    }
    if (componentChoice === 'time') {
      await io.input.time('Appointment start time')
    }
    if (componentChoice === 'loading') {
      const { updateMessage, destroy: destroySpinner } = await io.display.loading('Preparing records...', {
        description: 'This may take a while.',
      })
      await new Promise(r => setTimeout(r, 1000))
      updateMessage({ label: 'Attaching records...', icon: 'spinner' })
      await new Promise(r => setTimeout(r, 1000))
      updateMessage({ label: 'Processing records...', icon: 'spinner' })
      await new Promise(r => setTimeout(r, 1000))
      updateMessage({ label: 'Completed.', icon: 'check', description: '' })
      await new Promise(r => setTimeout(r, 1000))
      destroySpinner()
    }
    if (componentChoice === 'progress') {
      const { destroy: destroyLoadingBar, increment } = await io.display.progress('Processing records...', {
        description: 'This may take a while.',
        max: 6,
        indicator: true,
      })
      await new Promise(r => setTimeout(r, 1000))
      increment()
      await new Promise(r => setTimeout(r, 1000))
      increment()
      await new Promise(r => setTimeout(r, 1000))
      increment()
      await new Promise(r => setTimeout(r, 500))
      increment()
      await new Promise(r => setTimeout(r, 500))
      increment()
      await new Promise(r => setTimeout(r, 500))
      increment()
      await new Promise(r => setTimeout(r, 500))
      destroyLoadingBar()
    }
  }
})
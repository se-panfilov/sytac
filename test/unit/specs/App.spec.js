import App from 'src/App'
import {expect} from 'chai'

describe('App.', () => {

  it('can set select onChanged', () => {
    const mockThis = {
      selected: 'val'
    }

    App.methods.onChanged.call(mockThis, 'newVal')
    expect(mockThis.selected).to.equal('newVal')
  })

  it('can fetch data', () => {
    const mockThis = {
      callCount: 0,
      getSourceData () {
        this.callCount += 1
        return new Promise((resolve, reject) => {
          resolve()
        })
      }
    }

    App.methods.loadData.call(mockThis, 'newVal')
    expect(mockThis.callCount).to.equal(1)
  })

  it('can get message', () => {
    const val = 'some'
    expect(App.methods.getMessage(val)).to.equal(`Fetching data... ${val}`)
    expect(App.methods.getMessage()).to.equal(`Fetching data... `)
  })

  it('can handle fetch data error', () => {
    const mockThis = {
      message: null,
      getMessage: App.methods.getMessage,
      callCount: 0,
      loadData () {
        this.callCount += 1
      }
    }

    const delay = 3
    App.methods.onDataError.call(mockThis, 'error')
    expect(mockThis.message).to.equal(`Fetching data... Failed. Retry in ${delay} seconds`)

    setTimeout(() => {
      expect(mockThis.callCount).to.equal(1)
    }, delay * 1000)
  })

  it('can handle success data fetch', () => {
    const mockThis = {
      message: null,
      getMessage: App.methods.getMessage,
      vehicleData: null
    }

    const delay = 3
    const data = {some: 123}

    App.methods.onDataSuccess.call(mockThis, data)
    expect(mockThis.message).to.equal('Fetching data... Success!')
    expect(mockThis.vehicleData).to.deep.equal(data)

    setTimeout(() => {
      expect(mockThis.message).to.be.null
    }, delay * 1000)
  })
})

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
})


// getSourceData
// onDataError
// onDataSuccess

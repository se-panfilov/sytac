import SelectBox from 'src/components/select-box'
import {expect} from 'chai'

describe('onSelect.', () => {
  it('can emit event onSelect', () => {

    const mockThis = {
      expectedArgs: null,
      $emit (...rest) {
        this.expectedArgs = rest
      }
    }

    const expectedEventName = 'item-selected'

    SelectBox.methods.onSelect.call(mockThis, 'val')

    expect(mockThis.expectedArgs[0]).equal(expectedEventName)
    expect(mockThis.expectedArgs[1]).deep.equal('val')
  })

  it('can clear model onReset', () => {

    const mockThis = {
      model: 'val'
    }

    SelectBox.methods.onReset.call(mockThis)

    expect(mockThis.model).to.be.null
  })
})

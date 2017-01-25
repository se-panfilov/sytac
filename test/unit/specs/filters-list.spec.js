import FiltersList from 'src/components/filters-list'
import {expect} from 'chai'

describe('filters-list.', () => {
  describe('getUniq.', () => {
    it('can get array with uniq vals by getUniq', () => {
      const c = {
        red: 'red',
        white: 'white',
        blue: 'blue'
      }

      const arr = [c.red, c.white, c.blue, c.red, c.white]
      const result = FiltersList.methods.getUniq(arr)
      const expectedLength = Object.keys(c).length

      expect(result).to.have.length(expectedLength)
      expect(result.indexOf(c.red) > -1).to.be.true
      expect(result.indexOf(c.white) > -1).to.be.true
      expect(result.indexOf(c.blue) > -1).to.be.true
    })

    it('can handle array if integers', () => {
      const c = {
        first: 1,
        second: 2,
        third: 3
      }

      const arr = [c.first, c.second, c.third, c.first, c.second]
      const result = FiltersList.methods.getUniq(arr)
      const expectedLength = Object.keys(c).length

      expect(result).to.have.length(expectedLength)
      expect(result.indexOf(c.first) > -1).to.be.true
      expect(result.indexOf(c.second) > -1).to.be.true
      expect(result.indexOf(c.third) > -1).to.be.true
    })

    it('can handle empty arr', () => {
      const result = FiltersList.methods.getUniq([])

      expect(result).to.have.length(0)
    })

    it('can\'t handle no params', () => {
      expect(() => FiltersList.methods.getUniq()).to.throw('getUniq: array is mandatory')
    })

  })
})

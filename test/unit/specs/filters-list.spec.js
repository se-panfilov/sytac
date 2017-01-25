import FiltersList from 'src/components/filters-list'
import {expect} from 'chai'

describe('filters-list.', () => {
  describe('getUniq.', () => {
    it('can get array with uniq vals by getUniq', () => {
      const c = {
        red: 'red',
        green: 'green',
        blue: 'blue'
      }

      const arr = [c.red, c.green, c.blue, c.red, c.green]
      const result = FiltersList.methods.getUniq(arr)
      const expectedLength = Object.keys(c).length

      expect(result).to.have.length(expectedLength)
      expect(result.indexOf(c.red) > -1).to.be.true
      expect(result.indexOf(c.green) > -1).to.be.true
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

  describe('onSelect.', () => {
    it('emit event', () => {

      const mockThis = {
        filter: {
          type: 'type'
        },
        expectedArgs: null,
        $emit (...rest) {
          this.expectedArgs = rest
        }
      }

      const event = {
        target: {
          value: 'myVal'
        }
      }

      const expectedEventName = 'changed'

      FiltersList.methods.onSelect.call(mockThis, event, 'type')

      expect(mockThis.filter.type).equal('myVal')
      expect(mockThis.expectedArgs[0]).equal(expectedEventName)
      expect(mockThis.expectedArgs[1]).deep.equal(mockThis.filter)
    })
  })

  describe('filterBy.', () => {
    it('invalid params', () => {
      const method = 'filterBy'
      expect(() => FiltersList.methods[method]()).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([])).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([], null, null)).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method](null, '', null)).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method](null, null, '')).to.throw(`${method}: params should exist`)
    })

    it('can filter array of objects by value', () => {
      const c = {
        red: 'red',
        green: 'green',
        blue: 'blue'
      }

      const arr = [
        {
          name: 'R1',
          color: c.red
        },
        {
          name: 'R2',
          color: c.red
        },
        {
          name: 'G1',
          color: c.green
        },
        {
          name: 'B1',
          color: c.blue
        },
        {
          name: 'B2',
          color: c.blue
        },
        {
          name: 'B3',
          color: c.blue
        }
      ]

      const redArr = FiltersList.methods.filterBy(arr, c.red, 'color')
      const blueArr = FiltersList.methods.filterBy(arr, c.blue, 'color')
      const greenArr = FiltersList.methods.filterBy(arr, c.green, 'color')

      expect(redArr).to.have.length(2)
      expect(greenArr).to.have.length(1)
      expect(blueArr).to.have.length(3)

      expect(redArr.filter(v => v.name === 'R1')).to.be.have.length(1)
      expect(redArr.filter(v => v.name === 'R2')).to.be.have.length(1)

      expect(greenArr.filter(v => v.name === 'G1')).to.be.have.length(1)

      expect(blueArr.filter(v => v.name === 'B1')).to.be.have.length(1)
      expect(blueArr.filter(v => v.name === 'B2')).to.be.have.length(1)
      expect(blueArr.filter(v => v.name === 'B3')).to.be.have.length(1)

    })
  })

  describe('filterByColors.', () => {
    it('invalid params', () => {
      const method = 'filterByColors'
      expect(() => FiltersList.methods[method]()).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([])).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([], null)).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method](null, '')).to.throw(`${method}: params should exist`)
    })

    it('can filter array of objects by value', () => {
      const c = {
        red: 'red',
        green: 'green',
        blue: 'blue'
      }

      const arr = [
        {
          name: `RGB`,
          colors: [c.red, c.green, c.blue]
        },
        {
          name: `RB`,
          colors: [c.red, c.blue]
        },
        {
          name: `R`,
          colors: [c.red]
        },
        {
          name: `G`,
          colors: [c.green]
        },
        {
          name: `B`,
          colors: [c.blue]
        },
        {
          name: `BR`,
          colors: [c.blue, c.red]
        },
        {
          name: `GR`,
          colors: [c.green, c.red]
        }

      ]

      const redArr = FiltersList.methods.filterByColors(arr, c.red)
      const blueArr = FiltersList.methods.filterByColors(arr, c.blue)
      const greenArr = FiltersList.methods.filterByColors(arr, c.green)

      expect(redArr).to.have.length(5)
      expect(greenArr).to.have.length(3)
      expect(blueArr).to.have.length(4)

      expect(redArr.filter(v => v.name === 'RGB')).to.be.have.length(1)
      expect(redArr.filter(v => v.name === 'GR')).to.be.have.length(1)
      expect(redArr.filter(v => v.name === 'BR')).to.be.have.length(1)
      expect(redArr.filter(v => v.name === 'RB')).to.be.have.length(1)
      expect(redArr.filter(v => v.name === 'R')).to.be.have.length(1)

      expect(greenArr.filter(v => v.name === 'RGB')).to.be.have.length(1)
      expect(greenArr.filter(v => v.name === 'GR')).to.be.have.length(1)
      expect(greenArr.filter(v => v.name === 'G')).to.be.have.length(1)

      expect(blueArr.filter(v => v.name === 'RGB')).to.be.have.length(1)
      expect(blueArr.filter(v => v.name === 'B')).to.be.have.length(1)
      expect(blueArr.filter(v => v.name === 'BR')).to.be.have.length(1)
      expect(blueArr.filter(v => v.name === 'RB')).to.be.have.length(1)
    })
  })

  describe('getFilteredArr.', () => {
    it('invalid params', () => {
      const method = 'getFilteredArr'
      expect(() => FiltersList.methods[method]()).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([])).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([], null)).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method]([], null, '')).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method](null, '')).to.throw(`${method}: params should exist`)
      expect(() => FiltersList.methods[method](null, '', '')).to.throw(`${method}: params should exist`)
    })

    it('can return same arr when no filter specified', () => {
      const c = {
        red: 'red',
        green: 'green',
        blue: 'blue'
      }

      const arr = [
        {
          name: 'R',
          color: c.red
        },
        {
          name: 'G',
          color: c.green
        },
        {
          name: 'B',
          color: c.blue
        }
      ]


      const mockSource = {
        filter: {
          color: null
        }
      }

      const resultArr = FiltersList.methods.getFilteredArr.call(mockSource, arr, 'color')
      expect(resultArr).to.have.length(arr.length)
      expect(resultArr[0]).to.deep.equal(arr[0])
      expect(resultArr[1]).to.deep.equal(arr[1])
      expect(resultArr[2]).to.deep.equal(arr[2])
    })

    it('should call filterBy by default', () => {
      // TODO (S.Panfilov) refactor
      const c = {
        red: 'red',
        green: 'green',
        blue: 'blue'
      }

      const arr = [
        {
          name: 'R',
          color: c.red
        },
        {
          name: 'G',
          color: c.green
        },
        {
          name: 'B',
          color: c.blue
        }
      ]

      const mockSource = {
        filter: {
          color: c.red
        },
        filterBy: FiltersList.methods.filterBy
      }

      const resultArr = FiltersList.methods.getFilteredArr.call(mockSource, arr, 'color')
      const expectedArr = FiltersList.methods.filterBy(arr, c.red, 'color')
      expect(resultArr).to.have.length(expectedArr.length)
      expect(resultArr).to.deep.equal(expectedArr)
      expect(resultArr[0]).to.deep.equal(arr[0])
    })

  })


})

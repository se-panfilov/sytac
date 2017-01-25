import FiltersList from 'src/components/filters-list'
import {expect} from 'chai'

describe('filters-list.', () => {
  describe('methods.', () => {

    const c = {
      red: 'red',
      green: 'green',
      blue: 'blue'
    }

    describe('getUniq.', () => {
      it('can get array with uniq vals by getUniq', () => {
        const arr = [c.red, c.green, c.blue, c.red, c.green]
        const result = FiltersList.methods.getUniq(arr)
        const expectedLength = Object.keys(c).length

        expect(result).to.have.length(expectedLength)
        expect(result.indexOf(c.red) > -1).to.be.true
        expect(result.indexOf(c.green) > -1).to.be.true
        expect(result.indexOf(c.blue) > -1).to.be.true
      })

      it('can handle array if integers', () => {
        const num = {
          first: 1,
          second: 2,
          third: 3
        }

        const arr = [num.first, num.second, num.third, num.first, num.second]
        const result = FiltersList.methods.getUniq(arr)
        const expectedLength = Object.keys(num).length

        expect(result).to.have.length(expectedLength)
        expect(result.indexOf(num.first) > -1).to.be.true
        expect(result.indexOf(num.second) > -1).to.be.true
        expect(result.indexOf(num.third) > -1).to.be.true
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

  describe('computed.', () => {

    describe('types.', () => {
      it('can get types array', () => {
        const entity = {
          one: {
            name: 'name1',
            type: 'type1'
          },
          two: {
            name: 'name2',
            type: 'type2'
          },
          three: {
            name: 'name3',
            type: 'type4'
          }
        }

        const arr = [entity.one, entity.two, entity.three]

        const mockThis = {
          getUniq: FiltersList.methods.getUniq,
          filteredTypes: arr
        }

        const result = FiltersList.computed.types.call(mockThis)
        expect(result).to.have.length(arr.length + 1)
        expect(result[0]).to.equal('')
        expect(result[1]).to.equal(entity.one.type)
        expect(result[2]).to.equal(entity.two.type)
        expect(result[3]).to.equal(entity.three.type)

      })
    })

    describe('brands.', () => {
      it('can get brands array', () => {
        const entity = {
          one: {
            name: 'name1',
            brand: 'brand1'
          },
          two: {
            name: 'name2',
            brand: 'brand2'
          },
          three: {
            name: 'name3',
            brand: 'brand4'
          }
        }

        const arr = [entity.one, entity.two, entity.three]

        const mockThis = {
          getUniq: FiltersList.methods.getUniq,
          filteredBrands: arr
        }

        const result = FiltersList.computed.brands.call(mockThis)
        expect(result).to.have.length(arr.length + 1)
        expect(result[0]).to.equal('')
        expect(result[1]).to.equal(entity.one.brand)
        expect(result[2]).to.equal(entity.two.brand)
        expect(result[3]).to.equal(entity.three.brand)

      })
    })

    describe('colors.', () => {
      it('can get colors array', () => {
        const entity = {
          one: {
            name: 'name1',
            colors: ['color1a', 'color1b']
          },
          two: {
            name: 'name2',
            colors: ['color2a','color2b','color2c']
          },
          three: {
            name: 'name3',
            colors: ['color3a']
          }
        }

        const arr = [entity.one, entity.two, entity.three]

        const mockThis = {
          getUniq: FiltersList.methods.getUniq,
          filteredColors: arr
        }

        const result = FiltersList.computed.colors.call(mockThis)

        expect(result).to.have.length(7)
        expect(result[0]).to.equal('')
        expect(result[0]).to.equal('')
        expect(result.indexOf('color1a')).to.be.greaterThan(-1)
        expect(result.indexOf('color1b')).to.be.greaterThan(-1)
        expect(result.indexOf('color2a')).to.be.greaterThan(-1)
        expect(result.indexOf('color2b')).to.be.greaterThan(-1)
        expect(result.indexOf('color2c')).to.be.greaterThan(-1)
        expect(result.indexOf('color3a')).to.be.greaterThan(-1)

      })
    })

    // TODO (S.Panfilov)
    describe('filteredTypes.', () => {
      it('QQQ', () => {

      })
    })

    // TODO (S.Panfilov)
    describe('filteredBrands.', () => {
      it('QQQ', () => {

      })
    })

    // TODO (S.Panfilov)
    describe('filteredColors.', () => {
      it('QQQ', () => {

      })
    })

  })

})

const elements = {
  typesSelect: 'select[name=types]',
  typesClearBtn: 'button[@click=onReset]',
  brandsSelect: 'select[name=brands]',
  brandClearBtn: 'button[@click=onReset]',
  colorsSelect: 'select[name=colors]',
  colorsClearBtn: 'button[@click=onReset]',
}

function selectOption (browser, select, val) {
  browser.click(`${select} option[value="${val}"]`)
  // browser.click(`select[name="types"] option[value="car"]`)
}

function initPage (browser) {
  const devServer = browser.globals.devServerURL

  browser
    .url(devServer)
    .pause(200)

  return browser
}

module.exports = {
  '@tags': ['Main'],
  'default state': function (browser) {
    browser = initPage(browser)
    browser.expect.element('#app').to.be.present.before(1000)
    browser.expect.element(elements.typesSelect).to.be.a('select')
    browser.expect.element(elements.brandsSelect).to.be.a('select')
    browser.expect.element(elements.colorsSelect).to.be.a('select')

    browser.end()
  },
  'can select type': function (browser) {
    browser = initPage(browser)
    const val = 'car'

    //Wait for async data upload
    browser.expect.element(`${elements.typesSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.typesSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  },
  'can select color': function (browser) {
    browser = initPage(browser)
    const val = 'black'

    //Wait for async data upload
    browser.expect.element(`${elements.colorsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.colorsSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  },
  'can select brand': function (browser) {
    browser = initPage(browser)
    const val = 'Bugatti Veyron'

    //Wait for async data upload
    browser.expect.element(`${elements.brandsSelect} option[value="${val}"]`).to.be.present.before(10000)
    browser.expect.element('.details').text.to.equal('')

    selectOption(browser, elements.brandsSelect, val)

    browser.expect.element('.details').text.to.equal(val)
    browser.end()
  }
}

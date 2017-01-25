import {expect} from 'chai'
let page

module.exports = {
  '@tags': ['Main'],
  // beforeEach: function (browser, done) {
    // page = browser.page.login()
    // page.navigate().waitForElementVisible('app', 5000)
  // },
  // 'default state': function (browser) {
  //   const devServer = browser.globals.devServerURL
  //
  //   browser
  //     .url(devServer)
  //     .waitForElementVisible('#app', 5000)
  //     .assert.elementPresent('.details')
  //     .assert.elementCount('.filter-list__select-box', 3)
  //     .end()
  // },
  'select types': function (browser) {
    const devServer = browser.globals.devServerURL

    // page.click('@login')


    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('@typesSelect')
      // .getValue('@typesSelect', function (result) {
      //   console.info(result)
      //   console.info(result.value)
      //   expect(result.value).to.equal('')
      // })
    //   .click()
       .end()
  }
}

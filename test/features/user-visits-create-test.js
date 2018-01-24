const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('User visits the create page', () => {
    describe('posts a new item', () => {
      it('and clicks on the created item', () => {
        const itemToCreate = buildItemObject();
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');
        const xpath = `//div[@class="item-title"]/p[text() = "${itemToCreate.title}"]/ancestor::div[@class="item-card"]/a`;
        //console.log(xpath);
        browser.click(xpath);
        //console.log(browser.getHTML('body'));
        assert.include(browser.getText('body'), itemToCreate.description)
      });
    });
});

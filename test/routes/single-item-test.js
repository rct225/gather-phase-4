const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {


  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  describe('GET', () => {


    it('displays selected item', async () => {
      const itemToCreate = await seedItemToDatabase();

      const response = await request(app)
        .get('/items/' + itemToCreate._id);

      //console.log(parseTextFromHTML(response.text, '#item-title'), itemToCreate);
      assert.equal(parseTextFromHTML(response.text, '#item-title').trim(), itemToCreate.title);
      assert.equal(parseTextFromHTML(response.text, '#item-description').trim(), itemToCreate.description);

    });
  });
});

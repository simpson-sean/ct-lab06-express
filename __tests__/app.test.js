import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import TREK from '../lib/models/stapi-model.js';


// CRUD
// C - create  POST   --> INSERT
// R - read    GET    --> SELECT
// U - update  PUT    --> UPDATE
// D - delete  DELETE --> DELETE

// STAPI = Star Trek API (STAPI)


describe('stapi routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('creates a character', async () => {
      const character = { name: 'Captian Kirk', species: 'Human', faction: 'Starfleet'};
      const res = await request(app).post('/api/v1/trek_characters').send(character);

      expect(res.body).toEqual({
        id: '1',
        ...character,
      })
  });

  it('gets character by id', async () => {
    const character = await TREK.insert({
      name: 'Captain Kirk',
      species: 'Human',
      faction: 'Starfleet',
    });

    const res = await request(app).get(`/api/v1/trek_characters/${character.id}`);

    expect(res.body).toEqual(character);
  });

}); // <--- END PARENT CODE BLOCK


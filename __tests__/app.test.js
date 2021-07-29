import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import apiRequest from 'superagent';
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
      //const fakeSeries = expect.any(String);

      expect(res.body).toEqual({
        id: '1',
        ...character,
        //series: fakeSeries,
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

  it('gets all characters', async () => {
    const kirk = await TREK.insert({
      name: 'Captian Kirk',
      species: "Human",
      faction: 'Starfleet',
    })

    const shran = await TREK.insert({
      name: 'Shran',
      species: 'Andorian',
      faction: 'Andorian Imprial Guard',
    })

    const morn = await TREK.insert({
      name: 'Morn',
      species: 'Lurian', 
      faction: 'smuggler',
    })

    return request(app)
    .get(`/api/v1/trek_characters`)
    .then((res) => {
      expect(res.body).toEqual([ kirk, shran, morn ]);

    })

  });

  it('updates a character by ID', async () => {
      const character = await TREK.insert({
        name: 'Captain Picard',
        species: 'Human',
        faction: 'Starfleet',
      })

      const res = await request(app)
        .put(`/api/v1/trek_characters/${character.id}`)
        .send({ faction: 'retired' });

        expect(res.body).toEqual({ name:'Captain Picard', species: 'Human', faction: 'retired', id: '1' });
  });

  it('deletes a character by ID', async () => {
    const character = await TREK.insert({
      name: 'General Martok',
      species: 'Klingon', 
      faction: 'Klingon Empire',
    })

    const res = await request(app).delete(`/api/v1/trek_characters/${character.id}`);

    expect(res.body).toEqual({
      message: `${character.name} has been removed.`
    });
  });

  it('gets all series from API', async () => {
    const season = expect.any(Array);

    //const res = await apiRequest.get('http://stapi.co/api/v1/rest/season/search');
    const res = await request(app).get('/api/v1/trek_characters/series');
    const seasons = res.body.seasons;
    
    expect(seasons).toEqual(season);
  });


}); // <--- END PARENT CODE BLOCK


import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import trekService from '../lib/services/stapi-service.js';


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
      const fakeSeries = expect.any(String);

      expect(res.body).toEqual({
        id: '1',
        ...character,
        series: fakeSeries,
      })
  });

  it('gets character by id', async () => {
    const character = await trekService.getTrekSeasons({
      name: 'Captain Kirk',
      species: 'Human',
      faction: 'Starfleet',
    });

    const res = await request(app).get(`/api/v1/trek_characters/${character.id}`);

    expect(res.body).toEqual(character);
  });

  it('gets all characters', async () => {
    const kirk = await trekService.getTrekSeasons({
      name: 'Captian Kirk',
      species: "Human",
      faction: 'Starfleet',
    })

    const shran = await trekService.getTrekSeasons({
      name: 'Shran',
      species: 'Andorian',
      faction: 'Andorian Imprial Guard',
    })

    const morn = await trekService.getTrekSeasons({
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
      const character = await trekService.getTrekSeasons({
        name: 'Captain Picard',
        species: 'Human',
        faction: 'Starfleet',
      })

      const fakeSeries = expect.any(String);
    
      const res = await request(app)
        .put(`/api/v1/trek_characters/${character.id}`)
        .send({ faction: 'retired' });

        expect(res.body).toEqual({ name: 'Captain Picard', species: 'Human', faction: 'retired', series: fakeSeries, id: '1' });
  });

  it('deletes a character by ID', async () => {
    const character = await trekService.getTrekSeasons({
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

    const res = await request(app).get('/api/v1/trek_characters/series');
    const seasons = res.body.seasons;
    
    expect(seasons).toEqual(season);
  });


}); // <--- END PARENT CODE BLOCK


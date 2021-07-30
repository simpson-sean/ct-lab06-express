import request from 'superagent';
import TREK from '../models/stapi-model';
//import stapi_model from '../models/stapi-model';

export default class trekService {

    static async getTrekSeasons(character) {
        const data = await request.get('http://stapi.co/api/v1/rest/season/search');
        const seasons = data.body.seasons;
        const randomIndex = Math.floor(Math.random() * seasons.length);
        const randomSeasonObject = seasons[randomIndex];
        const seasonTitle = randomSeasonObject.title;

        const updatedCharacter = await TREK.insert({ series: seasonTitle, ...character });

        return updatedCharacter;
    }

}


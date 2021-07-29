import request from 'superagent';
//import TREK from '../models/stapi-model';
//import stapi_model from '../models/stapi-model';

export default class trekService {

    static async getTrekSeasons(character) {
        const data = await request.get('http://stapi.co/api/v1/rest/season/search')

        console.log(data.body.seasons['index'].title);
        const randomSeason = Math.floor(Math.random() * data.body.seasons.length);
        const finalSeason = data.body.seasons[randomSeason].title

        return {...character, series: finalSeason };

    }
}

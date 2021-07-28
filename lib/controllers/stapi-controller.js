import { Router } from 'express';
import TREK from '../models/stapi-model.js';
import stapi_model from '../models/stapi-model.js';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const character = await TREK.insert(req.body);

            res.send(character);
        
        } catch(err) {
            next(err);
        }
})
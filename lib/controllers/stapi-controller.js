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

    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const character = await TREK.getCharacterById(id);

            res.send(character)
            
        } catch(err) {
            next(err);
        }
    })

    .get('/', async (req, res, next) => {
        try {
        const allCharacters = await TREK.getAllCharacters();

        res.send(allCharacters);
        
        } catch(err) {
            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, species, faction } = req.body;

            const updatedCharacter = await TREK.updateCharacterById(id, { name, species, faction });

            res.send(updatedCharacter);
        
        } catch(err) {
            next(err);
        }
    })

    .delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const character = await TREK.deleteCharacterById(id);

            res.send({message: `${character.name} has been removed.`});
        
        } catch(err) {
            next(err);
        }
    })

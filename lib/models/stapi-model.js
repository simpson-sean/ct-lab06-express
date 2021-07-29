//import { request } from 'express';
import pool from '../utils/pool.js';
import request from 'superagent';

export default class stapi_model {
    id;
    name;
    species;
    faction;
    //series;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.species = row.species;
        this.faction = row.faction;
    //    this.series = row.series;
    };

    static async insert({ name, species, faction,}) {
        const { rows } = await pool.query(
            'INSERT INTO trek_characters (name, species, faction ) VALUES ($1, $2, $3) RETURNING *',
            [ name, species, faction ]
        );
        //console.log('FIRST INSERT');
        return new stapi_model(rows[0]);
    }

    static async getCharacterById(id) {
        const { rows } = await pool.query(`SELECT * FROM trek_characters WHERE id=$1`, [id]);

        //console.log('getCharacterById');
        return new stapi_model(rows[0]);
    }

    static async getAllCharacters() {
        const { rows } = await pool.query(`SELECT * FROM trek_characters`);

        //console.log('getAllCharacters');
        return rows.map((row) => new stapi_model(row));
    }

    static async updateCharacterById(id, { name, species, faction }) {
        const existingCharacter = await stapi_model.getCharacterById(id);
        const newName = name ?? existingCharacter.name;
        const newSpecies = species ?? existingCharacter.species;
        const newFaction = faction ?? existingCharacter.faction;

        const { rows } = await pool.query(
            `UPDATE trek_characters SET name=$1, species=$2, faction=$3 WHERE id=$4 RETURNING *`,
            [ newName, newSpecies, newFaction, id ]
        );
        //console.log('updateCharacterById');
        return new stapi_model(rows[0]);
    }

    static async deleteCharacterById(id) {
        const { rows } = await pool.query(`DELETE FROM trek_characters WHERE id=$1 RETURNING *`, [id]);
            
        console.log('********deleteCharacterById**********');
        return new stapi_model(rows[0]);
    }

    static async getTrekSeries() {
        //console.log('****** WHY WONT YOU WORK - TOP ***********')
        const results = await request.get('http://stapi.co/api/v1/rest/season/search');
        //console.log('****** WHY WONT YOU WORK - BOTTOM ***********')
        return results.body;
    }


}
import pool from '../utils/pool.js';

export default class stapi_model {
    id;
    name;
    species;
    faction;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.species = row.species;
        this.faction = row.faction;
    };

    static async insert({ name, species, faction }) {
        const { rows } = await pool.query(
            'INSERT INTO trek_characters (name, species, faction) VALUES ($1, $2, $3) RETURNING *',
            [ name, species, faction ]
        );

        return new stapi_model(rows[0]);
    }

    static async getCharacterById(id) {
        const { rows } = await pool.query(`SELECT * FROM trek_characters WHERE id=$1`, [id]);
        
        return new stapi_model(rows[0]);
    }
};

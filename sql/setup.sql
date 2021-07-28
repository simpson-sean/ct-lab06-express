DROP TABLE IF EXISTS trek_characters;

CREATE TABLE trek_characters (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    species TEXT NOT NULL, 
    faction TEXT NOT NULL

);
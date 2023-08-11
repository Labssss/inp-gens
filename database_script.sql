
CREATE ROLE api_diplom WITH LOGIN PASSWORD 'root';
ALTER ROLE api_diplom CREATEDB;

CREATE DATABASE diplom;
CREATE SCHEMA api;
CREATE SCHEMA auth;

CREATE TABLE auth.users
(
    id SERIAL PRIMARY KEY,
    token CHARACTER VARYING(16) NOT NULL UNIQUE,
    accessLvl INTEGER NOT NULL DEFAULT '1',
    role VARCHAR(255) DEFAULT 'USER',
);

CREATE TABLE api.useful
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title CHARACTER VARYING(100) NOT NULL,
    description CHARACTER VARYING(255),
    url CHARACTER VARYING(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

CREATE TABLE api.todolist
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title CHARACTER VARYING(100) NOT NULL,
    description CHARACTER VARYING(255),
    complete_date DATE NOT NULL,
    completed BOOLEAN DEFAULT false,
    FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

CREATE TABLE api.projects
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    url CHARACTER VARYING(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES auth.users (id)
);

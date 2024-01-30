CREATE DATABASE "flowForge.dev"
    WITH
    owner = postgres
    encoding = 'utf8'
    lc_collate = 'polish_poland.1250'
    lc_ctype = 'polish_poland.1250'
    tablespace = pg_default
    connection limit = -1;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA application;

CREATE TABLE application.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     name VARCHAR(255) NOT NULL
);


INSERT INTO application.users (name) VALUES ('John Doe');
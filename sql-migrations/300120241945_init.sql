CREATE DATABASE "tablica-kanban"
    WITH
    owner = postgres
    encoding = 'utf8'
    lc_collate = 'polish_poland.1250'
    lc_ctype = 'polish_poland.1250'
    tablespace = pg_default
    connection limit = -1;

CREATE SCHEMA application;


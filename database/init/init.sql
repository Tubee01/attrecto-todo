DROP DATABASE IF EXISTS master;

CREATE DATABASE master;

\ c master;

CREATE TABLE User (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    created_at timestamp DEFAULT current_timestamp NOT NULL,
    updated_at timestamp DEFAULT current_timestamp NOT NULL,
    CONSTRAINT pk_user PRIMARY KEY (id) admin boolean DEFAULT false NOT NULL
);

CREATE TABLE Todo (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(500),
    user_id uuid NOT NULL,
    created_at timestamp DEFAULT current_timestamp NOT NULL,
    updated_at timestamp DEFAULT current_timestamp NOT NULL,
    CONSTRAINT pk_todo PRIMARY KEY (id),
    CONSTRAINT fk_todo_user FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE
);
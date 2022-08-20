DROP DATABASE IF EXISTS master;

CREATE DATABASE master;

\c master;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "User" (
    "id" UUID DEFAULT uuid_generate_v4 (),
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "pk_user" PRIMARY KEY ("id")
);

CREATE TABLE "Todo"(
    "id" UUID DEFAULT uuid_generate_v4 (),
    "name" varchar(255) NOT NULL,
    "description" varchar(500),
    "user_id" uuid NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "pk_todo" PRIMARY KEY ("id"),
    CONSTRAINT "fk_todo_user" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);
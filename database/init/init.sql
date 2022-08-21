DROP DATABASE IF EXISTS master;

CREATE DATABASE master;

\c master;

-- ADD Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ADD ENUM
CREATE TYPE valid_log_Type AS ENUM ('create', 'update', 'delete', 'read');

-- CreateTable
CREATE TABLE "File"(
    "id" UUID DEFAULT uuid_generate_v4 (),
    "name" VARCHAR(3000) NOT NULL,
    "file" BYTEA NOT NULL,
    "mime_type" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "pk_file" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID DEFAULT uuid_generate_v4 (),
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL unique,
    "password" varchar(255) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "admin" boolean DEFAULT false NOT NULL,
    "profile_image_file_id" uuid NULL,
    CONSTRAINT "pk_user" PRIMARY KEY ("id"),
    CONSTRAINT "fk_file_user" FOREIGN KEY ("profile_image_file_id") REFERENCES "File" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Todo"(
    "id" UUID DEFAULT uuid_generate_v4 (),
    "title" varchar(255) NOT NULL,
    "description" varchar(500),
    "user_id" uuid NOT NULL,
    "date_till" TIMESTAMP(3) NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "done" boolean DEFAULT false NOT NULL,
    CONSTRAINT "pk_todo" PRIMARY KEY ("id"),
    CONSTRAINT "fk_todo_user" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Log" (
    "id" serial primary key,
    "type" valid_log_Type NOT NULL,
    "handler" varchar(255) NOT NULL,
    "data" json NULL,
    "user_id" uuid NOT NULL,
    "parent_id" int NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "fk_log_user" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "Notification"(
    "id" serial primary key,
    "todo_id" uuid NOT NULL,
    "user_id" uuid NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT "fk_notification_todo" FOREIGN KEY ("todo_id") REFERENCES "Todo" ("id") ON DELETE CASCADE,
    CONSTRAINT "fk_notification_user" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE
);

-- CreateTable
CREATE TABLE "user_sessions" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
) WITH (OIDS = FALSE);

-- AlterTable
ALTER TABLE
    "user_sessions"
ADD
    CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

-- CreateIndex
CREATE INDEX "IDX_session_expire" ON "user_sessions" ("expire");
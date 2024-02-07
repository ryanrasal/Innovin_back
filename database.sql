-- SQLBook: Code
DROP DATABASE IF EXISTS innovin;
CREATE DATABASE IF NOT EXISTS innovin;
USE innovin;
-- Création de la table "user"
DROP TABLE IF EXISTS user;
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    username VARCHAR(100),
    role VARCHAR(25),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    address VARCHAR(100),
    postalCode VARCHAR(255),
    city VARCHAR(255),
    phone VARCHAR(10)
);
-- Création de la table "wine"
DROP TABLE IF EXISTS wine;
CREATE TABLE wine (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(100),
    year INT,
    wine_type VARCHAR(10),
    origin_country VARCHAR(100),
    region VARCHAR(100),
    description TEXT,
    price INT,
    quantity INT,
    image VARCHAR(255)
);
-- Création de la table "message"
DROP TABLE IF EXISTS message;
CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    email VARCHAR(100),
    subject VARCHAR(100),
    content TEXT,
    isRead BOOLEAN default false
);
-- Création de la table "cart"
DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    is_order BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
-- Création de la table "cart_wine"
DROP TABLE IF EXISTS cart_wine;
CREATE TABLE cart_wine (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    quantity INT,
    wine_id INT,
    cart_id INT,
    FOREIGN KEY (wine_id) REFERENCES wine(id) ON DELETE CASCADE,
    FOREIGN KEY (cart_id) REFERENCES cart(id) ON DELETE CASCADE
);
CREATE DATABASE curriculum;
\c curriculum;

CREATE TABLE user_data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    contact VARCHAR(100),
    role VARCHAR(50),
    password VARCHAR(255)
);
INSERT INTO user_data (name, contact, role, password) VALUES
('admin', 'я админ) могу всё', 'admin', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user', 'я юзер', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user2', 'я юзер2', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user3', 'я юзер3', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user4', 'я юзер4', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user5', 'я юзер5', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle'),
('user6', 'я юзер6', 'user', '$2b$10$1zhfZBHaYxJ4U1Vx8TdWCOQ18mlvh7Y5e9be.3TfkN9nSYy6VBlle');

CREATE TABLE status (
    id SERIAL PRIMARY KEY,
    "name" VARCHAR(50)
);
INSERT INTO status ("name") VALUES
('В разработке'),
('Прошло внутренний нормо-контроль'),
('Прошло внешний контроль в УМО'),
('Одобрено для печати');

CREATE TABLE education_form (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50)
);
INSERT INTO education_form (name) VALUES
('Дневная'),
('Заочная');

CREATE TABLE curriculum (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    year INT,
    "statusId" INT REFERENCES status(id),
    "educationFormId" INT REFERENCES education_form(id),
    "filePath" BYTEA,
    "lastModified" TIMESTAMP,
    "developerId" INT REFERENCES user_data(id),
    "expiryDate" DATE
);
INSERT INTO curriculum (title, year, "statusId", "educationFormId", "filePath", "lastModified", "developerId", "expiryDate") VALUES
('Программа1', 2022, 1, 1, NULL, NOW(), 1, '2022-12-31'),
('Программа2', 2023, 2, 2, NULL, NOW(), 2, '2023-12-31'),
('Программа3', 2024, 3, 1, NULL, NOW(), 2, '2024-12-31'),
('Программа4', 2025, 1, 1, NULL, NOW(), 1, '2025-12-31'),
('Программа5', 2026, 2, 2, NULL, NOW(), 2, '2026-12-31'),
('Программа6', 2027, 3, 1, NULL, NOW(), 2, '2027-12-31'),
('Программа7', 2028, 1, 1, NULL, NOW(), 1, '2028-12-31'),
('Программа8', 2029, 2, 2, NULL, NOW(), 2, '2029-12-31'),
('Программа9', 2030, 3, 1, NULL, NOW(), 2, '2030-12-31'),
('Программа10', 2031, 1, 1, NULL, NOW(), 1, '2031-12-31'),
('Программа11', 2032, 2, 2, NULL, NOW(), 2, '2032-12-31'),
('Программа12', 2033, 3, 1, NULL, NOW(), 2, '2033-12-31'),
('Программа13', 2034, 1, 1, NULL, NOW(), 1, '2034-12-31'),
('Программа14', 2035, 2, 2, NULL, NOW(), 2, '2035-12-31'),
('Программа15', 2036, 3, 1, NULL, NOW(), 2, '2036-12-31'),
('Программа16', 2037, 1, 1, NULL, NOW(), 1, '2037-12-31'),
('Программа17', 2038, 2, 2, NULL, NOW(), 2, '2038-12-31'),
('Программа18', 2039, 3, 1, NULL, NOW(), 2, '2039-12-31');

CREATE TABLE specialty (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);
INSERT INTO specialty (name) VALUES
('Веб'),
('Покс'),
('Примат'),
('Наука о данных'),
('Машинное обучение'),
('Искусственный интеллект'),
('Кибербезопасность'),
('Облачные вычисления');

CREATE TABLE curriculum_specialty (
    id SERIAL PRIMARY KEY,
    "curriculumId" INT REFERENCES curriculum(id),
    "specialtyId" INT REFERENCES specialty(id),
    "educationFormId" INT REFERENCES education_form(id)
);

INSERT INTO curriculum_specialty ("curriculumId", "specialtyId", "educationFormId") VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 1, 1),
(5, 1, 2),
(6, 2, 1),
(7, 1, 1),
(8, 1, 2),
(9, 2, 1),
(10, 1, 1),
(11, 1, 2),
(12, 2, 1),
(13, 1, 1),
(14, 1, 2),
(15, 2, 1),
(16, 1, 1),
(17, 1, 2),
(18, 2, 1);
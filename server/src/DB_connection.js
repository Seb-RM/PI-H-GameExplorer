import { Sequelize } from "sequelize";

export const createDatabaseConnection = () => {
    const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

    return new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
    { login: true }
    );
};

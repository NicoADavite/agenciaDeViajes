import Sequelize from 'sequelize';
import dotenv from "dotenv/config";

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;


const db = new Sequelize( dbName, dbUser, dbPass, {
    host: dbHost,
    port: "3306",
    dialect: "mysql",
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: 0,
    logging: false
});

export default db;
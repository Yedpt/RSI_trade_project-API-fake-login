import { Sequelize } from "sequelize";
import { DB_PASSWORD, DB_HOST, DB_USER, DB_DEV_NAME, DB_TEST_NAME, DB_PORT, NODE_ENV } from '../config';

const isTest: boolean = NODE_ENV === 'test';
const dbName: string = isTest ? DB_TEST_NAME! : DB_DEV_NAME!;

const connectionDB = new Sequelize(dbName, DB_USER, DB_PASSWORD, {
    host: DB_HOST ,
    dialect: 'mysql',
    port: Number(DB_PORT) || 3306,
    timezone: "+01:00",
    define: {
      timestamps: false,
    },
});

export default connectionDB
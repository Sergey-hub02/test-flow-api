import express from 'express';
import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT as unknown as number,
});

const PORT = process.env.PORT;

const main = async () => {
    const app = express();
    app.use(express.json());

    app.get('/api/v1/hello/',  async (_, response) => {
        const result = await pool.query('SELECT $1::text AS message', ['Hello World!']);
        console.log(result.rows[0]);
        response.send('Подключение к базе данных прошло успешно!');
    });

    app.listen(PORT, () => {
        console.log('API запущено на http://localhost:8080/');
    });
};

main()
    .catch(error => {
        console.error(error.message);
    });

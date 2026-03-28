import express from "express";

const main = async () => {
    const app = express();

    app.get('/api/v1/hello/', (_, response) => {
        response.send('hello world');
    });

    app.listen(8080, () => {
        console.log('API запущено на http://localhost:8080/');
    });
};

main()
    .catch(error => {
        console.error(error.message);
    });

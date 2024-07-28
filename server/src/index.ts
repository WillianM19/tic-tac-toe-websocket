import App from "./app";

const app = new App();

const SERVER_PORT = 3333;

app.server.listen(SERVER_PORT, () => {
    console.log(`Servidor: http://localhost:${SERVER_PORT}`)
})
const express = require('express');
const path = require('path');
const routes = require('./src/routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(routes);

app.use((req, res, next) => {
    console.error(err.stack);
    console.log("Ocurrió un error en la aplicación:", err.message); // Agregamos este console.log
    res.status(404).send("Lo siento, no se encontró la página.", err.message);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal en el servidor.');
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});

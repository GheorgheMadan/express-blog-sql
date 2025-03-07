const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;

// importo il MIDDLEWARE errore 500 in caso di problemi interni
const errorHandler = require('./Middlewares/errorHandler')

// importo il MIDDLEWARE errore 404 in caso di errato endpoint
const notFound = require('./Middlewares/NotFound')

// definisco la cartella dei file statici
app.use(express.static('public'));

// autorizzo il body-parsing converto il body in qualcosa di leggibile 
app.use(express.json());

// Autorizza le richieste da http://localhost:5174 prima delle altre rotte
app.use(cors(
    { origin: 'http://localhost:5173' }
))

// definisco la rotta home, aggiungo il posto dove deve aggire l'errore in caso di errato endpoint
app.get('/', (req, res) => {
    res.send('Questa è la home della mia pagina')
});

// importo il file delle rotte
const postsRouters = require('./routers/postsRouters');

// definisco la rotta dei post 
app.use('/posts', postsRouters,);

// autorizzo il middleware 
app.use(errorHandler);

// autorizzo l'utilizzo del middleware not found
app.use(notFound)

// definisco il port 
app.listen(port, () => {
    console.log(`il server è in ascolto sul port ${port}`);
});
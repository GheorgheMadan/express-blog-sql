// Funzione che gestisce gli errori interni del server 
function errorHandler(err, req, res, next){
    res.status(500)
    res.json({
        error: err.message,
    })
};

module.exports = errorHandler;
const express = require('express');
const router = express.Router();

// importo le funzioni dal controllers 
const controllers = require('../controllers/postsControllers.js');

// index leggo i dati del posts
router.get('/', controllers.index);

// show leggo solo un elemento in base al suo id 
router.get('/:id', controllers.show); 
    
// delete eliminazione del elemento
router.delete('/:id', controllers.destroy)

// store aggiunta di un nuovo elemento 
router.post('/', controllers.post)

// update modifica interamente l'elemento
router.put('/:id', controllers.putUpdate)

// modify modifica dei post
router.patch('/:id', controllers.patch) 

// esporto le rotte 
module.exports = router
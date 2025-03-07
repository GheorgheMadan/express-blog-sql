const express = require('express');
const router = express.Router();
const { index, show, destroy, post, putUpdate, patch } = require('../controllers/postsControllers');

// index leggo i dati del posts
router.get('/', index);

// show leggo solo un elemento in base al suo id 
router.get('/:id', show);

// delete eliminazione del elemento
router.delete('/:id', destroy)

// store aggiunta di un nuovo elemento 
router.post('/', post)

// update modifica interamente l'elemento
router.put('/:id', putUpdate)

// modify modifica dei post
router.patch('/:id', patch)

// esporto le rotte 
module.exports = router
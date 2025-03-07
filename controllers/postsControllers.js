//importo i dati dei posts 
import connection from '../data/postsData.js';

// INDEX FUNZIONE CHE CI MOSTRERA' L'INTERO ARRAY DI OGGETTI 
function index(req, res) {

    // preparo la query 
    const sql = 'SELECT * FROM posts'

    // eseguo la query 
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results)
    }
    )
}


// FUNZIONE SHOW CHE MI MOSTRA SOLO L'OGGETTO CHE CONTIENTE UN DETERMINATO ID
function show(req, res) {
    // Converto il parametro ID in un numero intero 
    const id = parseInt(req.params.id);

    const sqlPosts = 'SELECT * FROM posts WHERE id = ?'

    const sqlTags = `SELECT tags.* FROM tags
    JOIN post_tag ON tags.id = post_tag.tag_id
    WHERE post_tag.post_id = ?
    `

    connection.query(sqlPosts, [id], (err, resultsPosts) => {
        if (err) return res.status(500).json({ error: 'Database Query failed' })
        if (resultsPosts.length === 0) return res.status(404).json({ error: 'Post Not Found' })

        const post = resultsPosts[0]

        connection.query(sqlTags, [id], (err, resultsTags) => {
            if (err) return res.status(500).json({ error: 'Data base query failed' });

            // aggiungo i tag al post
            post.tags = resultsTags;
            res.json(post)
        })



    })
}

// FUNZIONE DELETE che eliminerà un singolo post dalla lista 
function destroy(req, res) {
    // Converto il parametro ID in un numero intero 
    const id = parseInt(req.params.id);

    // creo la query che elimina in base l'id 
    const sql = 'DELETE FROM posts WHERE id = ?'

    connection.query(sql, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete post' });
        // imposto lo status a 204 modifica avvenuta
        res.sendStatus(204)
    }
    )
};


// FUNZIONE STORE aggiunge un nuovo post
function post(req, res) {
    // res.send('creazione di un nuovo post')
    // trovo l'ultimo post 
    const ultimoPost = posts[posts.length - 1];

    // trovo l'id dell'ultimo post
    const idUltimoPost = ultimoPost.id;

    // creo un nuovo id incrementando l'ultimo id
    const nuovoID = idUltimoPost + 1;

    // creo un nuovo post 
    const nuovoPost = {
        id: nuovoID,
        title: req.body.title,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    };

    // inserisco il nuovo oggetto nei posts
    posts.push(nuovoPost);

    // controllo in console il cambiamento
    console.log(posts);

    // resetto lo status corretto per il post creato 
    res.status(201);
    res.json(nuovoPost)
};


// FUNZIONE PUT, UPDATE DEL NOSTRO ELEMENTO 
function putUpdate(req, res) {
    // res.send('qui modifichi il tuo post');

    // trasformo il parametro ID in un numero 
    const id = parseInt(req.params.id)

    // con find cerco l'oggetto 
    const post = posts.find(post => post.id === id)

    // do una risposta negativa se il parametro id non esiste 
    if (!post) {

        res.status(404)

        return res.json({
            error: 'Not Found',
            message: 'post inesistente'
        })
    }

    // aggiorniamo la pizza
    post.title = req.body.title
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    // controllo i posts 
    console.log(posts);

    // restituiamo il post aggiornato
    res.json(post)

}

// FUNZIONE MODIFY modifica parzialmente il post 
function patch(req, res) {
    // res.send('modifica dei post')
    // trasformo il parametro ID in un numero 
    const id = parseInt(req.params.id)

    // con find cerco l'oggetto 
    const post = posts.find(post => post.id === id)

    // do una risposta negativa se il parametro id non esiste 
    if (!post) {

        res.status(404)

        return res.json({
            error: 'Not Found',
            message: 'post inesistente'
        })
    }

    // aggiorniamo la pizza
    // post.title = req.body.title
    // post.content = req.body.content
    // post.image = req.body.image
    // post.tags = req.body.tags

    // gestisco la casistica se un elemento non è stato modificato allora verrà scritto cosi com'è
    // versione con if 
    // if(req.body.title){
    //     post.title = req.body.title
    // } else {
    //     post.title = post.title
    // }
    //versione operatore ternario 
    req.body.title ? (post.title = req.body.title) : (post.title = post.title);
    req.body.content ? (post.content = req.body.content) : (post.content = post.content);
    req.body.image ? (post.image = req.body.image) : (post.image = post.image);
    req.body.tags ? (post.tags = req.body.tags) : (post.tags = post.tags);


    // controllo i posts 
    console.log(posts);

    // restituiamo il post aggiornato
    res.json(post)

}
// esportiamo tutto
export { index, show, destroy, post, putUpdate, patch };
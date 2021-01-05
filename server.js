// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })

// SQL Anbindung
fastify.register(require('fastify-mysql'), {
    connectionString: 'mysql:root:root@localhost:3306/products',
})

fastify.get('/products', async(request, reply) => {
    fastify.mysql.query('Select * FROM products', (error, result) => {
        reply.send(result);
    })
  })

  fastify.get('/products/:id', async(req, reply) => {
      fastify.mysql.query('select * from products where id = (?)', [req.params.id], (error, result) => {
          reply.send(result)
      })
  })

  /* Start (am basteln) */
  function update(bodyInput, id) {
    let body = bodyInput
    let updated = false; 

    if (body.title) {
      fastify.mysql.query('UPDATE products SET title = ? WHERE ID = ?', [body.title, id], (error, result) => { 
        if (result.affectedRows === 1) {
          updated = true;
          console.log("Inside the title IF: " + updated)         
        }}  ) 
    }
    if (body.description) {
      fastify.mysql.query('UPDATE products SET description = ? WHERE ID = ?', [body.description, id], (error, result) => {
        if (result.affectedRows === 1) {
          updated = true;
          console.log("In der Description IF: " + updated) 
        }
      })
    }
    if (body.price && typeof(body.price) === 'number') {
      fastify.mysql.query('UPDATE products SET price = ? WHERE ID = ?', [body.price, id], (error, result) => {
        if (result.affectedRows === 1)
          updated = true;
      })
    }
    if (body.stock || body.stock === 0) {
      fastify.mysql.query('UPDATE products SET stock = ? WHERE ID = ?', [body.stock, id], (error, result) => {        
        if (result.affectedRows === 1){
          updated === true;
          console.log("In der IF: " + updated)  
        }          
          })
      }
      
        console.log("immediately before return: " + updated)
        return updated
  }

  /* Ende */

  fastify.post('/products', async(req, reply) => {
      if(!req.body.title) {
          reply.status(400)
          reply.send('Bitte Titel angeben!')
          return
      } else if (!req.body.description) {
        reply.status(400)
        reply.send('Bitte Beschreibung angeben!')
        return
      } else if (!req.body.price) {
        reply.status(400)
        reply.send('Bitte Preis angeben!')
        return
      } else if (!req.body.stock) {
        reply.status(400)
        reply.send('Bitte Lagerstand angeben!')
        return
      }

      fastify.mysql.query('INSERT INTO products (title, description, price, stock) values (?,?,?,?)', [req.body.title, req.body.description, req.body.price, req.body.stock], (error, result) => {
          reply.send({id: result.insertedId, title: req.body.title})
      } )
  })

  fastify.delete('/products/:id', async(req, reply) => {
      fastify.mysql.query('DELETE from products WHERE ID = ?', [req.params.id], (error, result) => {
          if (result.affectedRows === 1) {
              reply.status(204)
              reply.send('Artikel gelöscht')
          } else {
              reply.status(404)
              reply.send('Artikel nicht gefunden!')
          }
      })
  })

  fastify.put('/products/:id', (req, reply) => { 
    let isUpdated = false

     if (req.body === null) {
        reply.status(404)
        reply.send('Bitte Inhalt angeben!')
        return
      }

      isUpdated = update(req.body, req.params.id)
      
    if (isUpdated === false) {
        reply.status(404)
        reply.send('Nichts aktualisiert, prüf deine Eingabe!')
        
    } else {
        reply.status(200)
        reply.send('Datensatz wurde aktualisiert!')
        
    }
  })

// Run the server!
const start = async () => {
    try {
      await fastify.listen(3000)
      fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  }
  start();
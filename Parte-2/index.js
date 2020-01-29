let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );
let {BookmarkController} = require('./model');
let uuid = require( 'uuid' );
let app = express();

let server;

/* Tu código va aquí */
let bookmark = {
	id: uuid.v4(),
	titulo: String,
	descripcion: String,
	url: String
};

app.put('/api/bookmarks/:id', jsonParser, (req,res)=>{
	let id = req.body.id;
	let paramsId = req.params.id;
	let titulo= req.body.titulo;
	let descripcion = req.body.descripcion;
	let url= req.body.url;
	if(id==undefined){
		res.statusMessage = "id no es enviado en el cuerpo";
		return status(406).send();
	}
	else if(paramsId!=id){
		res.statusMessage = "ids no coinciden";
		return status(409).send();
	}
	else if(titulo==undefined&&descripcion==undefined&&url==undefined){
		res.statusMessage = "no se han proporcionado datos a actualizar";
		return status(406).send();
	}
	else{
		let newBookmark={};
		if (titulo != undefined) {
			newBookmark.titulo = titulo;
		}
		if (descripcion != undefined) {
			newBookmark.descripcion = descripcion;
		}
		if (url != undefined) {
			newBookmark.url = url;
		}
		BookmarkController.getById(id)
        .then(bk => {
            BookmarkController.update(id, newBookmark)
                .then(b => {
                    return res.status(202).json(b);
                })
                .catch(err => {
					res.statusMessage = "Database error";
					console.log(err);
                    return res.status(501).send();
                });
        })
        .catch(error => {
            res.statusMessage = "Error al localizar el bookmark";
            return res.status(404).send();
        });
	}

});


function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}
runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}
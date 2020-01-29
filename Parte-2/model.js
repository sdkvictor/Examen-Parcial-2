let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let bookmarks = mongoose.Schema({
    //id: uuid.v4(),
    titulo: String,
    descripcion: String,
    url: String
});

let Bookmark = mongoose.model('bookmark', bookmarks);

let BookmarkController = {
    update: function(newBookmark){
        return Bookmark.findByIdAndUpdate(id,newBookmark)
        .then(newBookmark=>{
            return newBookmark;
        })
        .catch(error=>{
            throw Error(error);
        });
    },
    getById: function(id){
        return Bookmark.findById(id)
        .then(bookmark=>{
            return bookmark;
        })
        .catch(error=>{
            throw Error(error);
        });
    }
}

module.exports = {
    BookmarkController
};
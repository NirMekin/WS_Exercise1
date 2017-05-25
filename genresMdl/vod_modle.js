
var mongoose    = require('mongoose'),
    schema      = mongoose.Schema,
    movieSchema = new schema({
        name:String,
        year:Number,
        rating:Number,
        cast:[String]
    }),
    tvShowSchema = new schema({
        name:String,
        start_year:Number,
        end_year:Number,
        rating:Number,
        stars:[{type:String}],
        episodes:Number
    }),
    genresSchema= new schema({
        cat_genres:String,
        movies: [movieSchema],
        tv_shows:[tvShowSchema]

    },{collection:'categories_genres'});

    var Genres = mongoose.model('categories_genre',genresSchema);

    module.exports = Genres;
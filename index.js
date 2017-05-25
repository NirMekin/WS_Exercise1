/**
 * Created by Nir Mekin on 5/10/2017.
 */
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express(),
        genres        = require('./genresMdl'),
        port        = process.env.PORT || 3000;
        // mongoose    = require('mongoose'),
        // consts      = require('./genresMdl/consts');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// mongoose.Promise = global.Promise;
// mongoose.connect(consts.MLAB_KEY);
// var     conn    = mongoose.connection;
//
// var     Genres  = require('./genresMdl/vod_modle');

//return API of WS
app.get('/',(req,res)=>{
    "use strict";
    res.sendFile(__dirname + "/API_Genres/");
})

//return all data of cat_genres.json
app.get('/getAllGenres',(req,res)=>{
    "use strict";
      genres.getAllGenres().then((result)=>{
          res.send(result);
      });
     })

//get params by POST and will return JSON of all data (Tv Shows and Movies) if it find the genres
app.post('/getOneGenre/',(req,res)=>{
    "use strict";
    // res.status(200).json(genres.getSpecificGenres(req.body.cat));
    console.log(`genre: ${req.body.cat}`);

    genres.getSpecificGenres(req.body.cat).then((result)=>{
        if(result.length==0)
            res.json({"Error":"Couldn't found Specific Genre"});
        else res.json(result);
    });


})

//Get Json with specific list of movies or tv shows of the genre
app.get('/getListofGenre/:genre/:movie_or_tvShow',(req,res)=>{
    "use strict";
    try {
        genres.getListofGenre(req.params.genre, req.params.movie_or_tvShow).then((result) => {
            if(result.length==0){
                res.json({"Error":"Genre Not Found"})
            }
            res.json(result);
        });
    }
    catch (err){
        res.json(err);
    }
    // res.status(200).json(genres.getListYearAndRating(req.params.year,req.params.rating));

})

//friendly Page not fount ( 404 )
app.all('*',(req,res)=>{
    "use strict";
    res.status(404).send(`friendly 404 :)
    Error DIR not found`);
})

app.listen(port,
    ()=>{
        console.log(`listening on port ${port}`);
    });

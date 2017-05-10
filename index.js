/**
 * Created by Nir Mekin on 5/10/2017.
 */
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        app         = express(),
        genres        = require('./genresMdl'),
        port        = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//return all data of cat_genres.json
app.get('/getAllGenres',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getAllGenres());

})

//get params by POST and will return JSON of all data (Tv Shows and Movies) if it find the genres
app.post('/getOneGenre/',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getSpecificGenres(req.body.cat));
    console.log(`Test ${req.body.cat}`);

})

// get JSON of all movies equal or higher to the rate and equal to the year
// and all Tv Shows equal or higher to the rate and they broadcast from until the year
// (example: if year==2000 it will search for tv shows there start year were equal or lower to 2000 and their end year are higher or equal to 2000)
app.get('/getListYearAndRating/:year/:rating',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getListYearAndRating(req.params.year,req.params.rating));

})

//return API of WS
app.all('/',(req,res)=>{
    "use strict";
    res.sendFile(__dirname + "/API_Genres/index.html");
})

app.listen(port,
    ()=>{
        console.log(`listening on port ${port}`);
    });
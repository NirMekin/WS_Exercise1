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

app.get('/getAllGenres',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getAllGenres());

})

app.post('/getOneGenre/',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getSpecificGenres(req.body.cat));
    console.log(`Test ${req.body.cat}`);

})

app.get('/getListYearAndRating/:year/:rating',(req,res)=>{
    "use strict";
    res.status(200).json(genres.getListYearAndRating(req.params.year,req.params.rating));

})

app.listen(port,
    ()=>{
        console.log(`listening on port ${port}`);
    });
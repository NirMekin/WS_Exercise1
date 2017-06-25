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

//return API of WS
// app.get('/',(req,res)=>{
//     "use strict";
//     res.sendFile(__dirname + "/API_Genres/");
// })

app.use('/', express.static('./API_Genres/'));//for API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});

//return all data of cat_genres.json
app.get('/getAllGenres',(req,res)=> {
    "use strict";
    // res.header('Access-Control-Allow-Origin','*');
    try {
        genres.getAllGenres().then((result) => {
            res.json(result);
        });
    }
    catch (err){
        res.send(err);
    }
})


//get params by POST and will return JSON of all data (Tv Shows and Movies) if it find the genres
app.post('/getOneGenre/',(req,res)=>{
    "use strict";
    // res.setHeader('Access-Control-Allow-Origin','*');
    try {
        genres.getSpecificGenres(req.body.cat).then((result)=>{
            res.json(result);
        })
    }
    catch (errResult){
        res.send(errResult);
    }

})

//Get Json with specific list of movies or tv shows of the genre
app.get('/getListofGenre/:genre/:movie_or_tvShow',(req,res)=>{
    "use strict";
    // res.setHeader('Access-Control-Allow-Origin','*');
    try {
        genres.getListofGenre(req.params.genre, req.params.movie_or_tvShow).then((result) => {
            res.json(result);
        });
    }
    catch (err){
        res.send(err);
    }
})

//friendly Page not fount ( 404 )
app.all('*',(req,res)=>{
    "use strict";
    // res.setHeader('Access-Control-Allow-Origin','*');
    res.status(404).json({"Error":"404 - Page not found"});
})

app.listen(port,
    ()=>{
        console.log(`listening on port ${port}`);
    });

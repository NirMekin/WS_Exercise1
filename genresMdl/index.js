/**
 * Created by Nir Mekin on 5/10/2017.
 */

const   data        = require('../data/cat_genres.json'),
        mongoose    = require('mongoose'),
        consts      = require('./consts');


mongoose.connect(consts.MLAB_KEY);
mongoose.Promise = global.Promise;
let     conn     = mongoose.connection;

var     vodGenres  = require('./vod_modle');

conn.on('error',
    (err)=>{
        console.log(`connection error: ${err}`);
        return err;
    });
conn.once('open',
    ()=> {
    "use strict";
        console.log("Connected to DB");
    });
module.exports = class Genres{

    //return all JSON
    static getAllGenres(){
              return  vodGenres.find({},'-_id',(err,genres)=>
                        {
                            if(err) console.log(`query error: ${err}`);
                            console.log(genres);
                            // res.status(200).send(genres);
                            return genres;
                        });
    }

    //receive type of genres (example - "action") and return all relevant data for specific genre
    static getSpecificGenres(req){
               return vodGenres.find({cat_genres:req},'-_id');
    }

    //receive genre and (movies or tv_shows)
    //return the list of movies or tv_shows of the request genre
     static getListofGenre(genre,movie_or_tvShow){
                var temp;
                if (movie_or_tvShow == 'movies') {
                    temp = 'tv_shows';

                }
                else if (movie_or_tvShow == 'tv_shows') {
                    temp = 'movies';
                }
                else {
                    throw {"Error": "Please Enter 'movies' or 'tv_shows' as a parameter"};
                }

                return vodGenres.find({cat_genres: genre}, `-_id -cat_genres -${temp}`,
                    (err, genres) => {
                        if (err) console.log(`query error: ${err}`);
                        if (genres.length == 0) {
                            console.log(`{"Error":"empty result"}`);
                        }
                        else {
                            console.log(genres);
                        }
                    });

        }



     }







// var tempdata = data.categories_genres;
// var arr =[];
//
// for(let i=0 ; i<tempdata.length ; i++){
//     let tempMovies = tempdata[i].movies;
//     let tempTvShows = tempdata[i].tv_shows;
//     for(let n=0 ; n<tempMovies.length ; n++){
//         if(tempMovies[n].rating>=_rating && tempMovies[n].year==_year)
//             arr.push(tempdata[i].movies[n]);
//     }
//     for(let n=0 ; n<tempTvShows.length ; n++){
//         if(tempTvShows[n].rating>=_rating && tempTvShows[n].start_year<=_year && (tempTvShows[n].end_year>=_year || tempTvShows[n].end_year==0))
//             arr.push(tempdata[i].tv_shows[n]);
//     }
// }
// if(arr.length==0)
//     return {"error": "no match"};
// return arr;
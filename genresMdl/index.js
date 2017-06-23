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

module.exports = class Genres{

    //return all JSON
    static getAllGenres(){
              return  new Promise((resolve,rejected)=>{
                  vodGenres.find({},'-_id',(err,genres)=>
                  {
                      if(err) {
                          console.log(`query error: ${err}`);
                          throw rejected(err);
                      }
                      else{
                          if(genres.length==0){
                              return resolve({"Error":"Problem finding data"})
                          }
                          else {
                              return resolve(genres);
                          }
                      }
                  });
              })

    }

    //receive type of genres (example - "action") and return all relevant data for specific genre
    static getSpecificGenres(req){

        return new Promise((resolve,rejected)=>{
            vodGenres.find({cat_genres:req},'-_id',(err,success)=>{
                if(err){
                    throw rejected(err)
                }
                else {
                    if(success.length==0)
                    {
                        return resolve({"Error":"Genre Not Fount"});
                    }
                    else return resolve(success)
                }
            })


            }
        )

    }

    //receive genre and (movies or tv_shows)
    //return the list of movies or tv_shows of the request genre
     static getListofGenre(genre,movie_or_tvShow){
        return new Promise((resolve,rejected)=>{
            let temp;
            if (movie_or_tvShow == 'movies') {
                temp = 'tv_shows';

            }
            else if (movie_or_tvShow == 'tv_shows') {
                temp = 'movies';
            }
            else {
                return resolve({"Error": "Please Enter 'movies' or 'tv_shows' as a parameter"});
            }

            return vodGenres.find({cat_genres: genre}, `-_id -cat_genres -${temp}`,
                (err, genres) => {
                    if (err) {
                        console.log(`query error: ${err}`);
                        throw rejected(err);
                    }
                    if (genres.length == 0) {
                        console.log(`{"Error":"empty result"}`);
                        return resolve({"Error":"Please Enter Valid Genre"})
                    }
                    else {
                        return resolve(genres);
                    }
                });
        })


        }


     }

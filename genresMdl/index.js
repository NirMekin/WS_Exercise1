/**
 * Created by Nir Mekin on 5/10/2017.
 */

const data        = require('../data/cat_genres.json');


module.exports = class Genres{

    //return all JSON
    static getAllGenres(){
        return data;
    }

    //receive type of genres (example - "action") and return all relevant data for specific genre
    static getSpecificGenres(cat_name){
        var cat = data.categories_genres;
        var arr =[];
        for(let i=0 ; i<cat.length ; i++){
            if(cat[i].cat_genres==cat_name){
                arr.push(cat[i].movies);
                arr.push(cat[i].tv_shows);
                return arr;
            }
        }
        return {"error":"Couldn't found Specific Genre"};
    }

    //receive year and rating and return:
    // 1. all movies their year = to the year received and their rating >= to the rating received
    // 2. all tv shows they broadcast between the year received and their rating >= to the rating received
     static getListYearAndRating(_year,_rating){
         var tempdata = data.categories_genres;
         var arr =[];

         for(let i=0 ; i<tempdata.length ; i++){
             let tempMovies = tempdata[i].movies;
             let tempTvShows = tempdata[i].tv_shows;
             for(let n=0 ; n<tempMovies.length ; n++){
                 if(tempMovies[n].rating>=_rating && tempMovies[n].year==_year)
                     arr.push(tempdata[i].movies[n]);
             }
             for(let n=0 ; n<tempTvShows.length ; n++){
                 if(tempTvShows[n].rating>=_rating && tempTvShows[n].start_year<=_year && (tempTvShows[n].end_year>=_year || tempTvShows[n].end_year==0))
                     arr.push(tempdata[i].tv_shows[n]);
             }
         }
         return arr;

     }
}
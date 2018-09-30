/*This is an action creator, which is returning an action, an action is nothing but an object
 * with fields type and payload */
export function selectMovie(movie){
    //console.log('a Movie has been selected',movie.title)
    return {
        type:'MOVIE_SELECTED',
        payload:movie
    }
}
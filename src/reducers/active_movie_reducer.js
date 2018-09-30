/*A reducer funnelling an action takes two argument, one is redux state and another is
* action.*/

/*Important point: The state here is not the application state but
the piece of state for which the reducer is responsible.*/
export default function (state=null,action){
    switch (action.type){
        case 'MOVIE_SELECTED':
            return action.payload


    }

    return state
}
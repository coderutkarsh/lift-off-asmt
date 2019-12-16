import {combineReducers} from 'redux'
// import reducer_movies from './reducer_movies'
// import active_movie_reducer from './active_movie_reducer'
import {testContentReducer,questionAttempt} from './testReducers'

const rootReducer = combineReducers({
    /*whatever the function reducer_movies is returning is stored in component*/
    // movies:reducer_movies,
    // active_movie:active_movie_reducer,
    testContent:testContentReducer,
    attempts:questionAttempt
})

export default rootReducer
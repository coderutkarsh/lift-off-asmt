import {combineReducers} from 'redux'
import {testContentReducer,questionAttempt} from './testReducers'

const rootReducer = combineReducers({
    testContent:testContentReducer,
    attempts:questionAttempt
})

export default rootReducer
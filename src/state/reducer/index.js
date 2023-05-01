// import {combineReducers, comboneReducers} from 'Redux';
// import amountReducer from './amountReducer';

// export default reducers = combineReducers({
//     amount: amountReducer
// })
import {combineReducers} from 'redux'
import cardItems from './reducer'

export default combineReducers({
    cardItems,
})
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

// const store = createStore (
//     rootReducer
// );

export default function store(initialState={}){
    return createStore(rootReducer,initialState, applyMiddleware(thunk));
}


//export default store;
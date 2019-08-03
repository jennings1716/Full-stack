import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"
const initial_state = {}
const middleware = [thunk];
console.log("rootReducer",rootReducer);
const store = createStore(rootReducer,initial_state,
    compose(applyMiddleware(...middleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
    
    );
//,initial_state,applyMiddleware(...middleware)
export default store;
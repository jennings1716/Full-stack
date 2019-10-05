import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import dataReducers from "./dataReducers";
import dataplaceReducers from "./dataplaceReducers";
const initialState = [];

const rootReducer = (state = [], action) => {
    const main_state = state.dataReducers;
    console.log("main_state",main_state)
    return {
      dataReducers: dataReducers(main_state, action),
      // merge languageCodes with original action object, now you have access in translations reducer
      dataplaceReducers: dataplaceReducers(main_state, action)
    };
  };
// const rootReducer = combineReducers({
//     dataReducers,
//     dataplaceReducers
// })
// const rootReducer = reduceReducers(dataReducers, dataplaceReducers,initialState);

export default rootReducer;
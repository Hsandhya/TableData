import { combineReducers } from "redux";
import DataReducer from "./DataReducer";

const RootReducers = combineReducers({
    beer : DataReducer
})

export default RootReducers;
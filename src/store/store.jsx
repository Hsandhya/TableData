import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import RootReducers from "../Reducers/RootReducers"; 

const store = createStore(RootReducers, applyMiddleware(thunk));

export default store;

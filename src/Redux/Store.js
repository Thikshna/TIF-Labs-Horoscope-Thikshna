import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { RootReducer } from "./Reducers/RootReducer";

export const myStore=createStore(RootReducer,composeWithDevTools(applyMiddleware(thunk,logger)) )

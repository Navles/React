// import { legacy_createStore as createstore } from "redux";
import {configureStore}from "@reduxjs/toolkit"
import rootReducer from "./index";

const store = configureStore( {reducer:rootReducer} );

export default store;

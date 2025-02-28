import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import {persistStore, persistReducer} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import expireTransform from 'redux-persist-transform-expire';


const expireConfig = expireTransform({
  expireKey: "expiry",
  defaultExpiration: 1000 * 60 * 60 * 1,
  autoExpire: true,
});


const persistConfig = {
  key: 'root',
  storage,
  transforms:[expireConfig]
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    product: persistedReducer,
  },
});

export const persistor = persistStore(store);

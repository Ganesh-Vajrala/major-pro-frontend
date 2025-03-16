import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import {persistStore, persistReducer} from 'redux-persist';
import storageSession from "redux-persist/lib/storage/session";
import expireTransform from 'redux-persist-transform-expire';


const expireConfig = expireTransform({
  expireKey: "expiry",
  defaultExpiration: 1000 * 60 * 60 * 1,
  autoExpire: true,
});


const persistConfig = {
  key: 'root',
  storage: storageSession,
  transforms:[expireConfig]
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    product: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
  
});

export const persistor = persistStore(store);

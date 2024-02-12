import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer, rootEpic } from './state';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { googleApiService, api } from 'services';
import { PERSIST_KEY } from 'constants.js';

export const persistConfig = {
  key: PERSIST_KEY,
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const epicMiddleware = createEpicMiddleware({
  dependencies: { googleApiService: googleApiService, api: api }
});

export default function configureStore() {
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 let store =  createStore(
   persistedReducer,
   composeEnhancers(
     applyMiddleware(epicMiddleware)
   ));
   epicMiddleware.run(rootEpic);
   let persistor = persistStore(store);
   return { store, persistor };
}

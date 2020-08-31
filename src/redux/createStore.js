import { createStore, applyMiddleware, compose } from 'redux'
import logger from 'redux-logger'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'
import createSagaMiddle from 'redux-saga'
import thunk from "redux-thunk";

const sagaMiddleware = createSagaMiddle()

const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middlewares = [thunk,sagaMiddleware,logger]



export const  store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

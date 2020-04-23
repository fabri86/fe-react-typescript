import { Store as ReduxStore, applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
const store: ReduxStore<ApplicationStore> = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

if (module.hot !== undefined) {
	module.hot.accept(() => {
		const nextRootReducer = combineReducers<ApplicationStore>({
			...require('./rootReducer').default,
		});

		store.replaceReducer(nextRootReducer);
	});
}

export default store;

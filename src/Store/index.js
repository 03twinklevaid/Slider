import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import homeReducer from "../Reducers/homeReducer";
import popup_Reducer from "../Reducers/PopupReducer";
import filterReducer from "../Reducers/filterReducer";
import pricefilterReducer from "../Reducers/priceFilter";
// import sliderReducer from "../Reducers/sliderReducer";

const rootReducer = combineReducers({
    products: homeReducer,
    popup_data: popup_Reducer,
    selectCategory: filterReducer,
    pricefilter: pricefilterReducer
    
    // slider: sliderReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore (
    rootReducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;

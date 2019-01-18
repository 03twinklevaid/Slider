import CONSTANTS from './../constants';
const initialState = [];

const pricefilterReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ACTION_TYPES.PRICE_FILTER.PRICE_FILTER :{
            return action.item;
        }
        default: {
            return state;        
        }
    }
}

export default pricefilterReducer;
import CONSTANTS from './../constants';
const initialState = {selectedCategory: ''};

const filterReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ACTION_TYPES.FILTER.SELECT_CATEGORY :{
            let selectedCategory = action.item;
            if(action.item === "All") {
                selectedCategory = '';
            }
            return {selectedCategory};
        }
        default: {
            return state;        
        }
    }
}

export default filterReducer;
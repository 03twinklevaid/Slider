import CONSTANTS from './../constants';
const initialState = [];

const homeReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ACTION_TYPES.HOME.ON_HOME_SUCCESS :{

        console.log(action)
            return [...action.data];
        }
        default: {
            return state;        
        }
    }
}

export default homeReducer;
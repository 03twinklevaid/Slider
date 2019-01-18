import CONSTANTS from './../constants'

const initialState = {
    visible: false,
    popupItem: null,
    itemIndex: -1
};

const popupReducer = (state = initialState, action) => {
    switch (action.type){
        case CONSTANTS.ACTION_TYPES.POP_UP.SHOW_POP_UP:{
            return {...state, popupItem: action.item,itemIndex: action.index, visible: true};
        }
        case CONSTANTS.ACTION_TYPES.POP_UP.HIDE_POP_UP:{
            return {...state, popupItem: null, visible: false};
        }
        default: {
            return state;
        }
    }
}

export default popupReducer;
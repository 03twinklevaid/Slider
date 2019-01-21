export const fetchProducts = () =>{
    return(dispatch) => {
        fetch('https://api.myjson.com/bins/n5umw')
        .then(res => res.json())
        .then(
          (products) => {
            dispatch({
                type: "HOME_SUCCESS",
                data: products
            })
          },
          (error) => {
            console.log('Error', error);  
          }
        );
    }
}
export const showPopup = (payload, index) => {
  return {
    type: "SHOW_POPUP",
    item: payload, 
    index: index
  }
}

export const hidePopup = () => {
  return {
    type: "HIDE_POPUP"
  }
}

export const selectCategory = (payload) => {
  return {
    type: "SELECT_CATEGORY",
    item: payload
  }
}
export const onPriceSliderChange = (payload) => {
  return {
    type: "PRICE_FILTER",
    item: payload
  }
}
//Async Actions

export const showNext = (index) => {
  return (dispatch, getState) => {
    const { products } = getState();
    if(products.length > (index + 1)) {
      const product = products[index + 1];
      dispatch(showPopup({...product}, index + 1));
    }
  }
}

export const showPrevious = (index) => {
  return (dispatch, getState) => {
    const { products } = getState();
    if(index > 0) {
      const product = products[index - 1];
      dispatch(showPopup({...product}, index - 1));
    }
  }
}
import React from 'react';

const ItemBox = (props) => {
    const item = props.item;

    return(
        <li className="listed-products animated">
            <span className="img-styling">
                <img alt="product-image" 
                     src={item.image} 
                     onClick={() => props.showPopup(item)}
                      />
            </span>
        </li> 
    );
}

export default ItemBox;
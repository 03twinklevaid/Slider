import React, {Component} from 'react';
import './style.css';
import {fetchProducts} from '../Actions';
import { connect} from 'react-redux';
import ItemBox from './ItemBox';
import Popup from './PopupScreen';
import {showPopup} from '../Actions';
import {hidePopup} from '../Actions';
import {selectCategory} from '../Actions';
import {onPriceSliderChange} from '../Actions';
import {showNext} from '../Actions';
import {showPrevious} from '../Actions';
import {Range as RangeSlider, Handle, createSliderWithTooltip}  from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

const Range = createSliderWithTooltip(RangeSlider);

const handle = (props) => {
    const { value, dragging, index, ...restProps } = props;
    return (
      <Tooltip
        prefixCls="rc-slider-tooltip"
        overlay={value}
        visible={dragging}
        placement="top"
        key={index}
      >
        <Handle value={value} {...restProps} />
      </Tooltip>
    );
};
class Home extends Component {
    state = {
        targetvalue: "All"
    }

    componentDidMount() {
        this.props.fetchProducts();
        // this.props.dispatch(fetchProducts());
    }
    handleChange = (event) => {
        this.setState({targetvalue: event.target.value});
        console.log("target value", event.target.value)
        this.props.selectCategory(event.target.value); 
    }
    render(){
        console.log("Price filter value", this.props.pricefilter)
        const products = this.props.products;
        var min, max;
        return(
            <div>
                {
                    products.forEach((item, index)=>{
                        if(index === 0){
                            min = max = item.price
                        }
                        if(item.price<min ){
                            min = item.price;
                        }
                        else if(max<item.price) {
                            max = item.price;
                        }
                    }
                    )
                }
                <div className="filter-wrapper">
                    <span className="heading-style">
                        <strong>Filters</strong>
                    </span>
                    <p className="pt-20">Select Price:</p>
                    {
                        products.length ?
                        <Range
                        defaultValue={[min,max]}
                        min={min}
                        max={max}
                        pushable={10}
                        Tooltip={true}
                        handle={handle}
                        marks={{ [min]:min, [Math.floor((min+max)/4)]:Math.floor((min+max)/4), [Math.floor((min+max)/2)]:Math.floor(min+max/2), [Math.floor(3*((min+max)/4))]:Math.floor(3*((min+max)/4)), [max]:max}}
                        onAfterChange={(event) => this.props.onPriceSliderChange (event)}
                    />
                     : null
                    }
                    <p className="pt-20">Categories:</p>
                    <select onChange={(event) => this.handleChange(event)}
                            value = {this.state.targetvalue}
                    >
                        {
                            this.props.categories.map((category, index)=>{
                                return (
                                <option value={category} key = {index}> {category} </option>
                                )
                            })
                        }
                        <option>All</option>
                    </select>
                </div>
                {   
                    products.length && 
                    <div className="container">
                        <span className="heading-style">
                            <strong>Check out your Favourite Food</strong>
                            <img alt="emoji" src="https://i.pinimg.com/736x/f8/ce/94/f8ce9454835a7bec6a36ad15eda19c11--smiley-emoji-smiley-faces.jpg" />
                        </span>
                        <ul className="products-unordered-listing">
                        {  
                            products.map((item, index)=> {
                            return <ItemBox item={item} key={index} index={index} showPopup={(payload)=>this.props.showPopup(payload,index)}/>
                            })
                        }
                        </ul>
                    </div>
                }

                    <Popup 
                        visible={this.props.popup_data.visible} 
                        item={this.props.popup_data.popupItem} 
                        hidePopup={this.props.hidePopup} 
                        showNext={this.props.showNext} 
                        showPrevious={this.props.showPrevious} 
                        index={this.props.popup_data.itemIndex}
                        productsLength={this.props.products.length} 
                    />
            </div>
           ) 
    }
   
}
const mapStateToProps = state => {
    var filteredproducts = state.products;
    var categoriesarr = [...new Set(state.products.map((item)=>{
        return item.category;
    }))]

    console.log('state.pricefilter', state.pricefilter[0], state.pricefilter[1])

    if (state.selectCategory.selectedCategory != '') {
        filteredproducts = state.products.filter((item) => {
            return item.category === state.selectCategory.selectedCategory
        })
    }
    if (state.pricefilter.length) {
        filteredproducts = filteredproducts.filter((item)=> {
            return state.pricefilter[0] <= item.price && state.pricefilter[1] >= item.price;
        })
    }
    return (
        {
        products: filteredproducts,
        categories: categoriesarr,
        popup_data: state.popup_data,
        slider: state.slider,
        selectCategory: state.selectCategory.selectedCategory,
        pricefilter: state.pricefilter
    })
}

const mapDispatchToProps = {
    fetchProducts,
    showPopup,
    hidePopup,
    showNext,
    showPrevious,
    selectCategory,
    onPriceSliderChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
import React, {PureComponent} from 'react';
import '../style.css';

class PopUp extends PureComponent {
    escFun = (event) => {
        if(event.keyCode === 27 && this.props.hidePopup) {
            this.props.hidePopup();
        }
        else if (event.keyCode === 37 && this.props.showPrevious) {
            this.props.showPrevious(this.props.index)
        }
        else if (event.keyCode === 39 && this.props.showNext) {
            this.props.showNext(this.props.index)
        }
    }


    componentDidMount(){
        document.addEventListener("keyup", this.escFun, false);
    }

    render() {
        const props = this.props;
        const item = props.item
        if(!props.visible) {
            return null;
        }
        return(
            <div className="popup-container">
                 <div>
                     <div className="slider">
                         <span className={`arrow ${props.index === 0? ("disable-Arrow-btn"):(null)}`} onClick={()=>props.showPrevious(props.index)}> <i className="fa fa-angle-left"></i> </span>
                         <span className="popup-img">
                             <img alt="popup" src={item.image} />
                         </span>
                         <span className={`arrow ${props.productsLength === props.index+1 ? ("disable-Arrow-btn"):(null)}`} onClick={()=>props.showNext(props.index)}> <i className="fa fa-angle-right"></i> </span>
                     </div>
                     <ul className="popup-listed-items">
                         <li>
                             <span>Name: {item.name}</span>
                         </li>
                         <li>
                             <span>Category: {item.category}</span>
                         </li>
                         <li>
                             <span>Price: {item.price} </span>
                         </li>
                     </ul>
                     <span className="close" 
                           onClick={props.hidePopup}
                           >&times;</span>
                 </div>
            </div>
         ) 
    }
}

export default PopUp;
import {Component} from "react";
import classes from "./ProductAttributeItem.module.css"

class ProductAttributeItem extends Component
{
    render() {
        return (
            <div className={classes.ProductAttributeItem}>
                {this.props.displayValue}
            </div>
        );
    }
}

export default ProductAttributeItem
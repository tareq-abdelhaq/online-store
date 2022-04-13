import {Component} from "react";
import classes from "./Productattribute.module.css"
import ProductAttributeItem from "./ProductAttributeItem/ProductAttributeItem";

class ProductAttribute extends Component
{
    render() {
        const items = this.props.items.map(item => <ProductAttributeItem key={item.id} {...item}/>)
        return (
            <div className={classes.ProductAttribute}>
                <h3 className={classes.AttributeName}>{this.props.name}</h3>
                <div className={classes.AttributeItems}>
                    {items}
                </div>
            </div>
        );
    }
}

export default ProductAttribute
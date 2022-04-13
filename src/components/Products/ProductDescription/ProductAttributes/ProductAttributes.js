import {Component} from "react";
import ProductAttribute from "./ProductAttribute/ProductAttribute"
import classes from "./ProductAttributes.module.css"
class ProductAttributes extends Component
{
    render() {
        const attributesElements = this.props.attributes.map(attribute => <ProductAttribute key={attribute.id} {...attribute}/>)
        return (
            <div className={classes.ProductAttributes}>
                {attributesElements}
            </div>
        );
    }
}

export default ProductAttributes
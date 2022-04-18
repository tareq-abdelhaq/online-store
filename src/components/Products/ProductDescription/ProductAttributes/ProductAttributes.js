import {Component} from "react";
import ProductAttribute from "./ProductAttribute/ProductAttribute"
import classes from "./ProductAttributes.module.css"
class ProductAttributes extends Component
{
    render() {
        const attributesElements = this.props.attributes.map(attribute => <ProductAttribute
            key={attribute.id}
            type={attribute.type}
            changeAttribute={this.props.changeAttribute}
            class={this.props.class}
            inProductDescription={this.props.inProductDescription}
            productId={this.props.productId}
            contentName={this.props.contentName}
            noCartOverlay={this.props.noCartOverlay}
            {...attribute} />)
        const classNames = [classes.ProductAttributes,classes[this.props.class || ""]]
        return (
            <div className={classNames.join(" ")}>
                {attributesElements}
            </div>
        );
    }
}

export default ProductAttributes
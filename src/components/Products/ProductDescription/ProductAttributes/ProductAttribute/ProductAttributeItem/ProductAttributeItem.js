import {Component} from "react";
import classes from "./ProductAttributeItem.module.css"

class ProductAttributeItem extends Component
{

    render() {
        let attributeChangedHandler
        if (this.props.inProductDescription && this.props.noCartOverlay)
        {
            attributeChangedHandler = this.props.changeAttribute
        }else {
            attributeChangedHandler = (e) => this.props.changeAttribute(e,this.props.productId)
        }
        const classNames = [classes.ProductAttributeItem,classes[this.props.class || ""],this.props.type === "swatch" ? classes.Swatch : ""]
        return (
            <>
                {/*
                this id just to make sure that it's relevant to
                specific product and specific attribute and specific value for that attribute
                since this is a reusable component and can be used different contexts
                */}
                <input id={`${this.props.attributeName}|${this.props.value}|${this.props.productId}`}
                       type="radio" name={`${this.props.contentName}|${this.props.productId}|${this.props.attributeName}`}
                       value={this.props.value} checked={this.props.attributeValue === this.props.value}
                       onChange={attributeChangedHandler}/>
                <label htmlFor={`${this.props.attributeName}|${this.props.value}|${this.props.productId}`}
                       className={classNames.join(" ")}
                       style={{backgroundColor: this.props.type === "swatch" ? `${this.props.value}` : ""}}
                >
                    {this.props.type !== "swatch" && this.props.value}
                </label>
            </>
        );
    }
}

export default ProductAttributeItem
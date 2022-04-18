import {Component} from "react";
import PropTypes from "prop-types"
import classes from "./CartItem.module.css"
import CartItemControls from "./CartItemControls/CartItemControls";
import ProductAttributes from "../../Products/ProductDescription/ProductAttributes/ProductAttributes";

class CartItem extends Component
{
    render() {
        // get the price object based on the current selected currency
        const productPrice = this.props.product.prices.find(price => price.currency.label === this.props.currency.label)
        const classNames =
            [classes.CartItem,classes[this.props.className || ""],this.props.noBorderBottom ? classes.NoBorderBottom: ""]
        return(
            <div className={classNames.join(" ")}>
                <div className={classes.ProductAttributes}>
                    <h2 className={classes.ProductName}>{this.props.product.name}</h2>
                    <p className={classes.ProductBrand}>{this.props.product.brand}</p>
                    <p className={classes.ProductPrice}>{productPrice.currency.symbol}{productPrice.amount}</p>
                    <ProductAttributes
                        attributes={this.props.product.attributes}
                        class={this.props.className}
                        changeAttribute={this.props.changeAttribute}
                        inProductDescription={this.props.inProductDescription}
                        productId={this.props.productId}
                        contentName={this.props.contentName}
                    />
                </div>
                <div className={classes.CartControls}>
                    <div>
                        <CartItemControls increaseAmount={this.props.increaseAmount} decreaseAmount={this.props.decreaseAmount} className={this.props.className}>
                            <p className={classes.ItemAmount}>{this.props.amount}</p>
                        </CartItemControls>
                    </div>
                    <img className={classes.ProductImage} src={this.props.product.gallery[0]} alt={this.props.product.name}/>
                </div>
            </div>
        )
    }
}

CartItem.propTypes = {
    product: PropTypes.object.isRequired,
    amount: PropTypes.number.isRequired,
    currency: PropTypes.object.isRequired,
    increaseAmount: PropTypes.func.isRequired,
    decreaseAmount: PropTypes.func.isRequired
}


export default CartItem
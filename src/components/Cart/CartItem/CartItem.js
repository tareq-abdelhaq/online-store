import {Component} from "react";
import classes from "./CartItem.module.css"
import CartItemControls from "./CartItemControls/CartItemControls";
import ProductAttributes from "../../Products/ProductDescription/ProductAttributes/ProductAttributes";

class CartItem extends Component
{
    render() {
        // get the price object based on the current selected currency
        const productPrice = this.props.product.prices.find(price => price.currency.label === this.props.currency.label)
        return(
            <div className={classes.CartItem}>
                <div>
                    <h2 className={classes.ProductName}>{this.props.product.name}</h2>
                    <p className={classes.ProductBrand}>{this.props.product.brand}</p>
                    <p className={classes.ProductPrice}>{productPrice.currency.symbol}{productPrice.amount}</p>
                    <ProductAttributes attributes={this.props.product.attributes}/>
                </div>
                <div className={classes.CartControls}>
                    <div>
                        <CartItemControls increaseAmount={this.props.increaseAmount} decreaseAmount={this.props.decreaseAmount}>
                            <p className={classes.ItemAmount}>{this.props.amount}</p>
                        </CartItemControls>
                    </div>
                    <img className={classes.ProductImage} src={this.props.product.gallery[0]} alt={this.props.product.name}/>
                </div>
            </div>
        )
    }
}

export default CartItem
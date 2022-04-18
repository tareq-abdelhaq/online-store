import {Component} from "react";
import classes from "./CartOverlay.module.css"

import BackDrop from "../../UI/BackDrop/BackDrop";
import CartItem from "../CartItem/CartItem";
import Button from "../../UI/Button/Button";

class CartOverlay extends Component
{
    render() {
        const cartItems = this.props.cartProducts.map(item => <CartItem key={item.product.id} currency={this.props.currency}
                                                                        increaseAmount={() => this.props.increaseAmount(item.product.id)}
                                                                        decreaseAmount={() => this.props.decreaseAmount(item.product.id)}
                                                                        className="CartOverlay"
                                                                        changeAttribute={this.props.changeAttribute}
                                                                        inProductDescription={this.props.inProductDescription}
                                                                        productId={item.product.id}
                                                                        contentName={this.props.contentName}
                                                                        {...item}/>)
        /*
            start calculating the total price based on
            the amount of product required  and its prices (based on the current currency selected)
        */
        const currentCurrency = this.props.currency
        let totalPrice = 0
        this.props.cartProducts.forEach(cartProduct => {
            let productPrice = cartProduct.product.prices.find(price => price.currency.label === currentCurrency.label)
            totalPrice += cartProduct.amount * productPrice.amount
        })
        /*
            end calculating the total price
        */
        return (
            <>
                <div className={classes.CartOverlay}>
                    <div>
                        <h3 className={classes.Header}><span>my bag,</span> {this.props.cartProducts.length} items</h3>
                        {cartItems}
                        {
                            this.props.cartProducts.length !== 0 &&
                            <div className={classes.TotalPrice}>
                                <p>total</p>
                                <p>{this.props.currency.symbol}{totalPrice.toFixed(2)}</p>
                            </div>
                        }
                    </div>
                    <div className={classes.CartOverlayButtons}>
                        <Button class="CartOverlay" clicked={this.props.showBag}> view bag </Button>
                        <Button primary class="CartOverlay" disabled={this.props.cartProducts.length === 0}> check out </Button>
                    </div>
                </div>
                <BackDrop clicked={this.props.hideCartOverlay}/>
            </>
        );
    }
}


export default CartOverlay
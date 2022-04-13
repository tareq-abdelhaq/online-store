import {Component} from "react"
import classes from "./Cart.module.css"
import CartItem from "./CartItem/CartItem";
class Cart extends Component
{
    render() {
        const cartItems = this.props.cartProducts.map(item => <CartItem key={item.product.id} currency={this.props.currency}
                                                                        increaseAmount={() => this.props.increaseAmount(item.product.id)}
                                                                        decreaseAmount={() => this.props.decreaseAmount(item.product.id)}
                                                                        {...item}/>)
        return(
            <section className={classes.Cart}>
                <header className={classes.CartHeader}>cart</header>
                {cartItems}
            </section>
        )
    }
}

export default Cart
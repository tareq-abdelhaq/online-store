import {Component} from "react"
import classes from "./Cart.module.css"
import CartItem from "./CartItem/CartItem";
class Cart extends Component
{
    render() {
        const cartItems = this.props.cartProducts.map((item,index) => <CartItem key={item.product.id} currency={this.props.currency}
                                                                                increaseAmount={() => this.props.increaseAmount(item.product.id)}
                                                                                decreaseAmount={() => this.props.decreaseAmount(item.product.id)}
                                                                                noBorderBottom={this.props.cartProducts.length - index === 1}
                                                                                productId={item.product.id}
                                                                                contentName={this.props.contentName}
                                                                                changeAttribute={this.props.changeAttribute}
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
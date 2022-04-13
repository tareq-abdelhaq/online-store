import {Component} from "react";
import classes from "./CartItemControls.module.css"

class CartItemControls extends Component
{
    render() {
        return (
            <>
                <div className={classes.ItemIncrement} onClick={this.props.increaseAmount}>+</div>
                {this.props.children}
                <div className={classes.ItemDecrement} onClick={this.props.decreaseAmount}>-</div>
            </>
        );
    }
}

export default CartItemControls
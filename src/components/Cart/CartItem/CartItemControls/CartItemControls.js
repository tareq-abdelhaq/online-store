import {Component} from "react";
import classes from "./CartItemControls.module.css"

class CartItemControls extends Component
{
    render() {
        const classNames = [classes.Control,classes[this.props.className || ""]]
        return (
            <>
                <div className={classNames.join(" ")} onClick={this.props.increaseAmount}>+</div>
                {this.props.children}
                <div className={classNames.join(" ")} onClick={this.props.decreaseAmount}>-</div>
            </>
        );
    }
}

export default CartItemControls
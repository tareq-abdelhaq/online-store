import {Component} from "react";
import classes from "./Button.module.css"

class Button extends Component
{
    render() {
        const classNames = [this.props.primary ? classes.Primary : classes.Secondary, classes[this.props.class] || ""]

        return (
            <button className={classNames.join(" ")} onClick={this.props.clicked} disabled={this.props.disabled}>
                {this.props.children}
            </button>
        );
    }
}

export default Button
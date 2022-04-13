import {Component} from "react";
import classes from "./Button.module.css"

class Button extends Component
{
    render() {
        return (
            <button className={this.props.primary && classes.Primary} onClick={this.props.clicked}>
                {this.props.children}
            </button>
        );
    }
}

export default Button
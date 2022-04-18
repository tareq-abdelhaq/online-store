import { Component } from "react"
import classes from "./BackDrop.module.css"

class BackDrop extends Component
{
    render() {
        return (
            <div className={classes.BackDrop} onClick={this.props.clicked}/>
        );
    }
}


export default BackDrop
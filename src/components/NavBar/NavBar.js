import React from "react"
import classes from "./NavBar.module.css"
import logo from "../../assets/store-logo.png"
import cart from "../../assets/cart.png"
import dollarCurrency from "../../assets/dollar currency.png"

class NavBar extends React.Component
{

    render() {
        const categoryListItems = this.props.categories.map(category => {
            return <li className={category === "clothes" ? classes["active"] : ""}>
                        <a href="#">{category}</a>
                   </li>
        })
        return (
            <nav className={classes["nav--bar"]}>
                <ul className={classes["categories"]}>
                    {categoryListItems}
                </ul>
                <img src={logo} alt="scandiweb store front" className={classes["logo"]}/>
                <ul className={classes["others"]}>
                    <li><button><img src={dollarCurrency} alt="dollar currency" /></button></li>
                    <li><button><img src={cart} alt="shopping cart"/></button></li>
                </ul>
            </nav>
        );
    }
}
export default NavBar
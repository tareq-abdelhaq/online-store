import React from "react"
import classes from "./NavBar.module.css"
import logo from "../../assets/images/store-logo.png"
import cart from "../../assets/images/cart.png"
import arrowUp from "../../assets/images/arrow-up.png"
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";


class NavBar extends React.Component
{
    state = {
        currencySwitcher: false
    }

    toggleCurrencySwitcher = () => {
        this.setState(prevCurrencySwitcher => {
            return {currencySwitcher: !prevCurrencySwitcher.currencySwitcher}
        })
    }
    closeCurrencySwitcher = () => {
        this.setState({currencySwitcher: false})
    }
    render() {
        const categoryListItems = this.props.categories.map(category => {
            return <li key={category} className={category === this.props.currentCategory ? classes["active"] : ""}>
                        <a href="#" onClick={(e)=>this.props.changeCategory(category)}>
                            {category}
                        </a>
                   </li>
        })
        return (
            <nav className={classes["nav--bar"]}>
                <ul className={classes["categories"]}>
                    {categoryListItems}
                </ul>
                <img src={logo} alt="scandiweb store front" className={classes["logo"]}/>
                <ul className={classes.Others}>
                    <li className={classes.Currency}>
                        <button onClick={this.toggleCurrencySwitcher}>
                            <span className={classes.CurrencySymbol}>{this.props.currentCurrency.symbol}</span>
                            <img src={arrowUp} alt="dollar currency" className={classes.ArrowImage}/>
                        </button>
                    </li>
                    <li><button><img src={cart} alt="shopping cart"/></button></li>
                    {this.state.currencySwitcher && <CurrencySwitcher
                        currencies={this.props.currencies}
                        changeCurrency={this.props.changeCurrency}
                        closeCurrencySitcher={this.closeCurrencySwitcher}/>}
                </ul>
            </nav>
        );
    }
}
export default NavBar
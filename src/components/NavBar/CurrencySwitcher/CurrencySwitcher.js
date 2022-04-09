import {Component} from "react";
import classes from "./CurrencySwitcher.module.css"

class CurrencySwitcher extends Component
{
    changeCurrency = (currency) => {
        this.props.changeCurrency(currency)
        this.props.closeCurrencySitcher()
    }

    render() {
        const currenciesElements = this.props.currencies.map(currency => {
            return <li key={currency.label}><
                        button onClick={() => this.changeCurrency(currency)}
                        >
                            {currency.symbol} {currency.label}
                        </button>
                  </li>
        })
        return (
            <ul className={classes.Currencies}>
                {currenciesElements}
            </ul>
        );
    }
}

export default CurrencySwitcher

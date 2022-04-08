import {Component} from "react"
import classes from "./Product.module.css"

class Products extends Component
{
    render() {
        const price = {}
        this.props.prices.forEach(prc => {
            if (prc.currency.symbol === "$"){
                price.symbol = "$"
                price.amount = prc.amount
            }
        })
        return (
            <article className={[classes.ProductCard,!this.props.inStock && classes.OutOfStock].join(" ")}>
                <div className={classes.Product}>
                    <div>
                        {!this.props.inStock && <p className={classes.Out}> out of stock </p>}
                        <img src={this.props.gallery[0]} alt={this.props.name} className={classes.ProductImage}/>
                    </div>

                    <div className={classes.ProductDetails}>
                        <p className={classes.ProductName}>{this.props.name}</p>
                        <p className={classes.ProductPrice}>{price.symbol}{price.amount}</p>
                    </div>
                </div>
            </article>
        )

    }
}

export default Products

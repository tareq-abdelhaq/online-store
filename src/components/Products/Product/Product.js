import {Component} from "react"
import classes from "./Product.module.css"
import circleCart from "../../../assets/images/circle-icon.png"

class Product extends Component
{
    render() {
        const price = {}
        this.props.prices.forEach(prc => {
            if (prc.currency.label === this.props.currency.label){
                price.symbol = prc.currency.symbol
                price.amount = prc.amount
            }
        })
        const classNames = [classes.ProductCard,!this.props.inStock && classes.OutOfStock, this.props.addedToCart && classes.AddedToCart]
        return (
            <article
                className={classNames.join(" ")}>
                <div className={classes.Product}>
                    <div>
                        {!this.props.inStock && <p className={classes.Out}> out of stock </p>}
                        <img src={this.props.gallery[0]} alt={this.props.name} className={classes.ProductImage}/>
                        {this.props.addedToCart && <img className={classes.CircleCart} src={circleCart} alt="circular shopping cart"/>}
                    </div>

                    <div className={classes.ProductDetails}>
                        <p className={classes.ProductName} onClick={() => this.props.showProductDescription(this.props.id)}>{this.props.name}</p>
                        <p className={classes.ProductPrice}>{price.symbol}{price.amount}</p>
                    </div>
                </div>
            </article>
        )

    }
}

export default Product

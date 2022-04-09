import {Component} from "react"
import classes from "./Products.module.css"
import Product from "./Product/Product";

class Products extends Component
{
    render() {
        const products = this.props.products.map(product => <Product key={product.id}
                                                                     currency={this.props.currentCurrency}
                                                                     {...product}
                                                            />)
        return (
            <section className={classes.Products}>
                <header className={classes.CategoryName}>
                    {this.props.currentCategory}
                </header>
                <div className={classes.ProductsGrid}>
                    {products}
                </div>
            </section>
        )
    }
}

export default Products
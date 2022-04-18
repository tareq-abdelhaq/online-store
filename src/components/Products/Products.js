import {Component} from "react"
import classes from "./Products.module.css"
import Product from "./Product/Product";

class Products extends Component
{
    render() {
        const products = this.props.products.map(product => <Product key={product.id}
                                                                     currency={this.props.currentCurrency}
                                                                     {...product}
                                                                     addedToCart={this.props.cartProducts.find(cartProduct => cartProduct.product.id === product.id)}
                                                                     showProductDescription={this.props.showProductDescription}
        />)
        const pageNumbers = []
        for(let i = 1 ; i<= Math.ceil(this.props.productsCount/this.props.productsPerPage); i++){
            pageNumbers.push(i)
        }
        return (
            <section className={classes.Products}>
                <header className={classes.CategoryName}>
                    {this.props.currentCategory}
                </header>
                <div className={classes.ProductsGrid}>
                    {products}
                </div>
                {
                    pageNumbers.length > 1 &&
                    <div className={classes.Paginate}>
                        <ul className={classes.Pages}>
                            {
                                pageNumbers.map(pageNumber => {
                                    return (
                                        <li key={pageNumber}
                                            onClick={(e) => this.props.changeCurrentPage(pageNumber)}
                                            className={this.props.currentPage === pageNumber ? classes.PageActive : ""}
                                        >
                                            {pageNumber}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                }
            </section>
        )
    }
}

export default Products
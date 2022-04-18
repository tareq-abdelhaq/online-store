import React from "react"
// import {query,graphQLEndPoint} from "../query"
// import axios from "axios"
import { data } from "../data"
import classes from "./App.module.css"
import WithErrorHandler from "../hoc/WithErrorHandler";
import NavBar from "../components/NavBar/NavBar";
import Products from "../components/Products/Products"
import ProductDescription from "../components/Products/ProductDescription/ProductDescription";
import Cart from "../components/Cart/Cart";
import CartOverlay from "../components/Cart/CartOverlay/CartOverlay";

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            // data: {categories: []},
            data: data,
            currentCategory: "all",
            currentCurrency: {
                symbol: "$",
                label: "USD"
            },
            showProductDescription: false,
            currentProduct: null,
            showCart: false,
            shoppingCart: [],
            showCartOverlay: false,
            currentPage: 1
        }
    }

    componentDidMount()
    {
        // const fetchData = async () => {
        //     const queryResult = await axios.post(
        //         graphQLEndPoint,{
        //             query: query
        //         }
        //     );
        //     const result = queryResult.data.data.categories
        //     this.setState({data: {categories: result}})
        // }
        // fetchData()
    }
    changeCategoryHandler = (name) => {
        this.setState({currentCategory: name, showProductDescription: false, showCart: false})
    }

    currencyChangeHandler = ({label, symbol}) => {
        const currentCurrency = {...this.state.currentCurrency};
        currentCurrency.label = label;
        currentCurrency.symbol = symbol
        this.setState({currentCurrency: currentCurrency})
    }

    showProductDescriptionHandler = (id) => {
        /*
            get the product from the shopping cart first if it exists to show its last status
            else, get it from the products
        */
        let currentProduct
        const cartProduct = this.state.shoppingCart.find(cartProduct => cartProduct.product.id === id)
        if (cartProduct){
            currentProduct = cartProduct.product
        }else{
            currentProduct = this.state.data.categories[0].products.find((product) => product.id === id)
            // add value prop to each product attribute to be used later to determine which attribute is selected
            currentProduct.attributes.forEach(attribute => attribute.value = "")
        }

        this.setState({showProductDescription: true,showCart: false, currentProduct: currentProduct})


    }
    productAddedToCartHandler = () => {
        this.setState(prevState => {
            return {
                shoppingCart: [...prevState.shoppingCart,{amount: 1, product: this.state.currentProduct}]
            }
        })
    }
    attributeChangedHandler = (e) => {
        /* check if the current product exist in the shopping cart, then its attributes should be changed from the cart || cart overlay
          and not from the product description
         */
        const product = this.state.shoppingCart.find(cartProduct => cartProduct.product.id === this.state.currentProduct.id)
        if (!product) {
            const updatedCurrentProduct = {...this.state.currentProduct}
            const attributeName = e.target.name.split("|")[2]
            const updatedAttributes = updatedCurrentProduct.attributes.map(attribute => {
                if (attribute.name === attributeName){
                    let updatedAttribute = {...attribute}
                    updatedAttribute.value = e.target.value
                    return updatedAttribute
                }else{
                    return attribute
                }
            })
            this.setState(prevState => {
                return {
                    currentProduct: {...prevState.currentProduct,attributes: updatedAttributes}
                }
            })
        }

    }
    cartProductAttributeChangedHandler = (e,id) => {
        const attributeName = e.target.name.split("|")[2]
        this.setState(prevState => {
            return {
                shoppingCart: prevState.shoppingCart.map(cartProduct => {
                    if (cartProduct.product.id === id){
                        cartProduct.product.attributes.map(attribute => {
                            if (attribute.name === attributeName){
                                attribute.value = e.target.value
                                return attribute
                            }else{
                                return attribute
                            }
                        })
                        return cartProduct
                    }else{
                        return cartProduct
                    }
                })
            }
        })
    }

    amountIncreasedHandler = (id) => {
        const product = this.state.shoppingCart.find(item => item.product.id === id)
        const updatedProduct = {...product}
        updatedProduct.amount+=1;

        this.setState(prevState => {
            return {
                shoppingCart: prevState.shoppingCart.map(item => {return item.product.id !== id ? item : updatedProduct})
            }
        })
    }
    amountDecreasedHandler = (id) => {
        const product = this.state.shoppingCart.find(item => item.product.id === id)
        if (product.amount === 1){
            this.setState(prevState => {
                return {
                    shoppingCart: prevState.shoppingCart.filter(item => item.product.id !== id)
                }
            })
            return
        }
        const updatedProduct = {...product}
        updatedProduct.amount-=1;

        this.setState(prevState => {
            return {
                shoppingCart: prevState.shoppingCart.map(item => {return item.product.id !== id ? item : updatedProduct})
            }
        })
    }
    cartHandler = () => {
        this.setState({showCart: true,showProductDescription: false, showCartOverlay: false})
    }
    cartOverlayHandler = () => {
        this.setState(prevState => ({showCartOverlay: !prevState.showCartOverlay}))
    }
    backDropClickedHandler = () => {
        this.setState({showCartOverlay: false})
    }
    currentPageChangedHandler = (pageNumber) => {
        this.setState({currentPage: pageNumber})
    }
    render() {
        // filter products based on the currentCategory
        let products = []
        this.state.data.categories.forEach(category => {
            if (this.state.currentCategory === category.name){
                products = category.products;
            }
        })
        /*
          get slice from the products based on the current page
        */
        const numberOfProducts = products.length
        const productsPerPage = 6
        const indexOfLastProduct = this.state.currentPage * productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        products = products.slice(indexOfFirstProduct,indexOfLastProduct)
        // get all currencies to be passed to the navbar
        let currencies = this.state.data.categories.length !== 0 && this.state.data.categories[0].products[0]
            .prices.map(price => price.currency)

        // determine which content to be shown
        let content =  (
            <Products currentCategory={this.state.currentCategory}
                      currentCurrency= {this.state.currentCurrency}
                      products={products}
                      cartProducts={this.state.shoppingCart}
                      showProductDescription={this.showProductDescriptionHandler}
                      productsPerPage={productsPerPage}
                      productsCount= {numberOfProducts}
                      currentPage={this.state.currentPage}
                      changeCurrentPage={this.currentPageChangedHandler}
            />
        )
        if (this.state.showProductDescription)
        {

            content = <ProductDescription {...this.state.currentProduct} currency={this.state.currentCurrency} cartProducts={this.state.shoppingCart}
                                          addToCart={this.productAddedToCartHandler} changeAttribute={this.attributeChangedHandler}
                                          inProductDescription={this.state.showProductDescription}
                                          noCartOverlay={this.state.showCartOverlay}
                                          contentName="productDescription"
            />
        }
        if (this.state.showCart)
        {
            content = <Cart cartProducts={this.state.shoppingCart} currency={this.state.currentCurrency}
                            increaseAmount={this.amountIncreasedHandler}
                            decreaseAmount={this.amountDecreasedHandler}
                            changeAttribute={this.cartProductAttributeChangedHandler}
                            inProductDescription={this.state.showProductDescription}
                            contentName="cart"
            />
        }
        return (
            <WithErrorHandler>
                <div className={classes.App}>
                    <NavBar categories={this.state.data.categories.map(category => category.name)}
                            changeCategory={this.changeCategoryHandler} currentCategory={this.state.currentCategory}
                            currencies={currencies} currentCurrency={this.state.currentCurrency}
                            changeCurrency={this.currencyChangeHandler} cartProducts={this.state.shoppingCart}
                            toggleCartOverlay={this.cartOverlayHandler}
                    />
                    {
                        this.state.showCartOverlay && <CartOverlay cartProducts={this.state.shoppingCart}
                                                                   hideCartOverlay={this.backDropClickedHandler}
                                                                   currency={this.state.currentCurrency}
                                                                   increaseAmount={this.amountIncreasedHandler}
                                                                   decreaseAmount={this.amountDecreasedHandler}
                                                                   showBag={this.cartHandler}
                                                                   inProductDescription={this.state.showProductDescription}
                                                                   contentName="cartOverlay"
                                                                   changeAttribute={this.cartProductAttributeChangedHandler}
                        />
                    }
                    {content}
                </div>
            </WithErrorHandler>
        );
    }
}

export default App;

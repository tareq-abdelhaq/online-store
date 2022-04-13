import React from "react"
import {query,graphQLEndPoint} from "../query"
import axios from "axios"
import WithErrorHandler from "../hoc/WithErrorHandler";
import NavBar from "../components/NavBar/NavBar";
import classes from "./App.module.css"
import Products from "../components/Products/Products"
import ProductDescription from "../components/Products/ProductDescription/ProductDescription";
import Cart from "../components/Cart/Cart";

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: {categories: []},
            currentCategory: "all",
            currentCurrency: {
                symbol: "$",
                label: "USD"
            },
            showProductDescription: false,
            currentProduct: null,
            showCart: false,
            shoppingCart: []
        }
    }

  componentDidMount()
  {
      const fetchData = async () => {
          const queryResult = await axios.post(
              graphQLEndPoint,{
                  query: query
              }
          );
          const result = queryResult.data.data.categories
          this.setState({data: {categories: result}})
      }
      fetchData()
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
        this.setState({showProductDescription: true,showCart: false, currentProduct: id})
  }
  productAddedToCartHandler = (id) => {
        // check if the product already exists in the cart or not
        if (this.state.shoppingCart.find(item => item.product.id === id)){
            return
        }
        const product = this.state.data.categories[0].products.find(product => product.id === id)
        this.setState(prevState => {
            return {
                ...prevState,
                shoppingCart: [...prevState.shoppingCart,{amount: 1, product: product}]
            }
        })
  }
  amountIncreasedHandler = (id) => {
        const product = this.state.shoppingCart.find(item => item.product.id === id)
        const updatedProduct = {...product}
        updatedProduct.amount+=1;

        this.setState(prevState => {
            return {
                ...prevState,
                shoppingCart: prevState.shoppingCart.map(item => {return item.product.id !== id ? item : updatedProduct})
            }
        })
  }
  amountDecreasedHandler = (id) => {
        const product = this.state.shoppingCart.find(item => item.product.id === id)
        if (product.amount === 1){
            this.setState(prevState => {
                return {
                    ...prevState,
                    shoppingCart: prevState.shoppingCart.filter(item => item.product.id !== id)
                }
            })
            return
        }
      const updatedProduct = {...product}
      updatedProduct.amount-=1;

      this.setState(prevState => {
          return {
              ...prevState,
              shoppingCart: prevState.shoppingCart.map(item => {return item.product.id !== id ? item : updatedProduct})
          }
      })
  }
  cartShownHandler = () => {
        this.setState({showCart: true,showProductDescription: false})
  }
  render() {
      // filter products based on the currentCategory
      let products = []
      this.state.data.categories.forEach(category => {
          if (this.state.currentCategory === category.name){
              products = category.products;
          }
      })
      // get all currencies to be passed to the navbar
      let currencies = this.state.data.categories.length !== 0 && this.state.data.categories[0].products[0]
                       .prices.map(price => price.currency)

     // determine which content to be shown
     let content =  (
        <Products currentCategory={this.state.currentCategory}
                  currentCurrency= {this.state.currentCurrency}
                  products={products}
                  showProductDescription={this.showProductDescriptionHandler}
        />
     )
     if (this.state.showProductDescription)
     {
         const product = this.state.data.categories[0].products.find((product) => product.id === this.state.currentProduct)
         content = <ProductDescription {...product} currency={this.state.currentCurrency} addToCart={this.productAddedToCartHandler}/>
     }
     if (this.state.showCart)
     {
         content = <Cart cartProducts={this.state.shoppingCart} currency={this.state.currentCurrency}
                         increaseAmount={this.amountIncreasedHandler}
                         decreaseAmount={this.amountDecreasedHandler}
                   />
     }
     return (
        <WithErrorHandler>
        <div className={classes["App"]}>
            <NavBar categories={this.state.data.categories.map(category => category.name)}
                    changeCategory={this.changeCategoryHandler} currentCategory={this.state.currentCategory}
                    currencies={currencies} currentCurrency={this.state.currentCurrency}
                    changeCurrency={this.currencyChangeHandler} cartProducts={this.state.shoppingCart}
                    showBag={this.cartShownHandler}
            />
            {content}
        </div>
        </WithErrorHandler>
    );
  }
}

export default App;

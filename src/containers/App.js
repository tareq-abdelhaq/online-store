import React from "react"
import {query,graphQLEndPoint} from "../query"
import axios from "axios"
import WithErrorHandler from "../hoc/WithErrorHandler";
import NavBar from "../components/NavBar/NavBar";
import classes from "./App.module.css"
import Products from "../components/Products/Products"
import ProductDescription from "../components/Products/ProductDescription/ProductDescription";

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
            currentProduct: null
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
        this.setState({currentCategory: name, showProductDescription: false})
  }

  currencyChangeHandler = ({label, symbol}) => {
      const currentCurrency = {...this.state.currentCurrency};
      currentCurrency.label = label;
      currentCurrency.symbol = symbol
      this.setState({currentCurrency: currentCurrency})
  }

  showProductDescriptionHandler = (id) => {
        this.setState({showProductDescription: true,currentProduct: id})
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
         content = <ProductDescription {...product}/>
     }
     return (
        <WithErrorHandler>
        <div className={classes["App"]}>
            <NavBar categories={this.state.data.categories.map(category => category.name)}
                    changeCategory={this.changeCategoryHandler} currentCategory={this.state.currentCategory}
                    currencies={currencies} currentCurrency={this.state.currentCurrency}
                    changeCurrency={this.currencyChangeHandler}
            />
            {content}
        </div>
        </WithErrorHandler>
    );
  }
}

export default App;

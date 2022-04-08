import React from "react"
import {query,graphQLEndPoint} from "../query"
import axios from "axios"
import WithErrorHandler from "../hoc/WithErrorHandler";
import NavBar from "../components/NavBar/NavBar";
import classes from "./App.module.css"
import Products from "../components/Products/Products"
import products from "../components/Products/Products";

class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: {categories: []},
            currentCategory: "all"
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
        this.setState({currentCategory: name})
  }


  render() {
      let products = []
      this.state.data.categories.forEach(category => {
          if (this.state.currentCategory === category.name){
              products = category.products;
          }
      })

     return (
        <WithErrorHandler>
        <div className={classes["App"]}>
            <NavBar categories={this.state.data.categories.map(category => category.name)}
                    changeCategory={this.changeCategoryHandler} currentCategory={this.state.currentCategory}/>
            <Products currentCategory={this.state.currentCategory} products={products}/>
        </div>
        </WithErrorHandler>
    );
  }
}

export default App;

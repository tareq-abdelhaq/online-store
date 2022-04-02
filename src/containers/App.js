import React from "react"
import {query,graphQLEndPoint} from "../query"
import axios from "axios"
import WithErrorHandler from "../hoc/WithErrorHandler";
import NavBar from "../components/NavBar/NavBar";
import classes from "./App.module.css"


class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            data: {categories: []}
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
  render() {
    return (
        <WithErrorHandler>
        <div className={classes["App"]}>
            <NavBar categories={this.state.data.categories.map(category => category.name)}/>
        </div>
        </WithErrorHandler>
    );
  }

}

export default App;

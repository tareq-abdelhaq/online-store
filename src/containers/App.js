import React from "react"
import {query,graphQLEndPoint} from "../query"
import axios from "axios"
import WithErrorHandler from "../hoc/WithErrorHandler";


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
            <h1>fetching the data</h1>
        </WithErrorHandler>
    );
  }

}

export default App;

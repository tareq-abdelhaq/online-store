import React from "react"
class WithErrorHandler extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            errorMessage: ""
        }
    }
    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true,errorMessage: error})
    }

    render() {
        return (
            this.state.hasError  ?
                <div>
                    <p>some error happened, try again later</p>
                </div>
                :
                this.props.children
        );
    }
}

export default WithErrorHandler
import React, { Component } from "react";

class index extends Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  // callAPI() {
  //   fetch("http://localhost:9000/GBITG")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }))
  //     .catch(err => err);
  // }

  componentDidMount() {
    //this.callAPI();
  }

  render() {
    return (
      <div>
        <p>Index</p>
      </div>
    );
  }
}

export default index;

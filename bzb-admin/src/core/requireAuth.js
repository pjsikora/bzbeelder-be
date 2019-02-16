import React, { Component } from "react";
import { connect } from "react-redux";

// HOC checker
export default ChildComponent => {
  class ComposedComponent extends Component {
    componentDidMount() {
      this.shouldGoToLoginPage();
    }

    componentDidUpdate() {
      this.shouldGoToLoginPage();
    }

    shouldGoToLoginPage() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

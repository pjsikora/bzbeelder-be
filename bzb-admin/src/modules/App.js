import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PostList from './post/components/PostList';
import PostForm from './post/components/PostForm';
import LoginForm from './auth/components/LoginForm';
// import * as actions from 'actions';

class App extends Component {
  renderHeader() {
    return (
      <ul>
        <li>
          <Link to="/">Login</Link>
        </li>
        <li>
          <Link to="/post/">List of posts</Link>
        </li>
        <li>
          <Link to="/post/form">Create post</Link>
        </li>

      </ul>
    );
  }

  render() {
    return (
      <div>
        {this.renderHeader()}
        <Route path="/" exact component={LoginForm} />
        <Route path="/post/" exact component={PostList} />
        <Route path="/post/form" exact component={PostForm} />
        <Route path="/post/form/:id" exact component={PostForm} />
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return { auth: state.auth };
// }

// export default connect(mapStateToProps, actions)(App);
export default App;
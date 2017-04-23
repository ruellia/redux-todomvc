import React from 'react';

export default class Footer extends React.Component {
  render() {
    return <footer className="info">
      <p>Double-click to edit a todo</p>
      <p>Following this <a style={{textDecoration: "underline"}} href="http://www.theodo.fr/blog/2016/03/getting-started-with-react-redux-and-immutable-a-test-driven-tutorial-part-1/">tutorial</a> by <a href="https://twitter.com/phacks">@phacks</a></p>
      <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
  }
};
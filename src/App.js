import React from "react";
import './App.css';
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import axios from "axios";

class App extends React.Component {
  state = {
    users: [],
    loading: false,
    alert: null
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?clientID=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data, loading: false });
  // }

  searchGithubUsers = async (text) => {
    console.log(text);
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&clientID=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({ users: res.data.items, loading: false });
  }

  clearGithubUsers = () => {
    this.setState({users: [], loading: false});
  }

  setAlert = (message, type) => {
    this.setState({alert: {message, type}});
    setTimeout(() => this.setState({alert: null}), 5000);
  }

  render() {
    const {users, loading} = this.state;

    return (
      <div className="App">

        <h1>Hello from React</h1>
        <NavBar />
        <div className="container">
          <Alert alert={this.state.alert} />
          <Search 
            searchUsers={this.searchGithubUsers} 
            clearUsers={this.clearGithubUsers} 
            showClear={users.length > 0 ? true: false} 
            setAlert={this.setAlert}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;

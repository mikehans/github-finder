import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.text === '') {
            this.props.setAlert('Please enter something', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }

    onChange = (e) => {
        this.setState({ text: e.target.value });
    }

    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form">
                    <input type="text" name="text" id="" value={this.state.text} onChange={this.onChange} placeholder="Search Users..." />
                    <input type="submit" value="Search" className="btn btn-dark btn-block" />
                    {showClear && <input type="button" value="Clear" className="btn btn-light btn-block" onClick={clearUsers} />}
                </form>
            </div>
        )
    }
}

export default Search

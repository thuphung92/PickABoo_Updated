import React, { Component } from 'react'
import UserContext from '../context/UserContext';
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {
    static contextType = UserContext

    componentDidMount() {
        const { setUser } = this.context
        setUser({})
        localStorage.clear()
    }
    render() {
        return (
            <div>
                <Redirect to={{pathname: '/'}}/>
            </div>
        )
    }
}

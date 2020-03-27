import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import fakeAuth from './Auth'

function Authenticate(props) {
    return (
        fakeAuth.isAuthenticated ? (
            <div>
                {props.children}
            </div>
        ) : (<Redirect to='/login' />)
    )
}

export default withRouter(Authenticate)
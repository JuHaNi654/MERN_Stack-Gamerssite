import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import axios from 'axios'
import { config } from '../config/config'


function Authenticate(props) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUser = async () => {
            let token = localStorage.getItem("jwt")
            if (!token) {
                setLoading(false)
                return
            } else {
                await axios.get(`${config.backEnd}/api/users/profile`, {
                    headers: { Authorization: token }
                }).then(response => {
                    setUser(response.data)
                }).catch(err => {
                    setUser(null)
                })
                setLoading(false)
            }
        }
        getUser()
    }, [])


    if (loading) {
        return (<div>Loading ...</div>)
    } else {
        return (
            user ? (
                <div>
                    {props.children}
                </div>
            ) : (<Redirect to="/login" />)

        )
    }


}

export default withRouter(Authenticate)
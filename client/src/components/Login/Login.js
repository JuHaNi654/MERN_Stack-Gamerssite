import React, { useState } from 'react'
import fakeAuth from '../Auth/Auth'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import './login.css'

function Login() {
    let history = useHistory()
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")

    const submitForm = (e) => {
        e.preventDefault()
        fakeAuth.authenticate(() => {
            history.replace("/")
        })
    }
    return (
        <div className="wrapper">
            <Container>
                <Form className="formStyle">
                    <Form.Group controlId="formInputEmail">
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formInputPw">
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submitForm}>
                        Log-in
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login
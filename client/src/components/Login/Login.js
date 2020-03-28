import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import './login.css'

function Login() {
    let history = useHistory()
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")

    const submitForm = (e) => {
        e.preventDefault()
        axios.post("http://localhost:8000/api/users/login", {
            email: email,
            password: pw
        })
            .then((response) => {
                let token = 'Bearer ' + response.data.token
                localStorage.setItem('jwt', token)
                history.replace("/")
            })
            .catch((err) => {
                console.log("error: ", err.response)


                if (err.response.status === 401 ||
                    err.response.status === 400) {
                    // Invalid credentials
                } else if (err.response.status === 404) {
                    // Service not awaible
                }
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
import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useHistory } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import { validateLoginInput } from '../validation/validation'
import InputError from '../error/InputError'


function Login() {
    let history = useHistory()
    const [email, setEmail] = useState("")
    const [pw, setPw] = useState("")
    const [errors, setErrors] = useState(null)


    const submitForm = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: pw
        }

        const { errors, isValid } = validateLoginInput(user)
        if (!isValid) {
            setErrors(errors)
            return;
        }

        axios.post("http://localhost:8000/api/users/login", user)
            .then((response) => {
                let token = 'Bearer ' + response.data.token
                localStorage.setItem('jwt', token)
                history.replace("/")
            })
            .catch((err) => {
                if (err.response.status === 401 ||
                    err.response.status === 400) {
                    setErrors({ error: "Invalid email or password" })
                } else if (err.response.status === 404) {
                    setErrors({ error: "Service unavailable :(" })
                }
            })

    }

    const renderError = () => {
        if (errors) {
            return (
                <InputError errors={errors} />
            )
        }
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
                    <Button variant="primary" onClick={submitForm}>
                        Sign in
                    </Button>
                    <span className="spanTxt">or</span>
                    <Button variant="primary" onClick={() => history.replace("/signup")}>
                        Sign up
                    </Button>
                    {renderError()}
                </Form>
            </Container>
        </div>
    )
}

export default Login
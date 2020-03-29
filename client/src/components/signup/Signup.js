import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import InputError from '../error/InputError'
import { validateRegisterInput } from '../validation/validation'
import axios from 'axios'

function Signup() {
    let history = useHistory()
    const [errors, setErrors] = useState(null)
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [pw, setPw] = useState("")
    const [pw2, setPw2] = useState("")

    const renderError = () => {
        if (errors) {
            return (
                <InputError errors={errors} />
            )
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        const newUser = {
            username: username,
            email: email,
            password: pw,
            password2: pw2
        }

        const { errors, isValid } = validateRegisterInput(newUser)
        if (!isValid) {
            setErrors(errors)
            return;
        } else {
            setErrors(null)
        }


        axios.post("http://localhost:8000/api/users/signup", newUser)
            .then(res => {
                history.replace("/login")
            })
            .catch(err => {
                console.log(err)
                if (err.response.status === 400) {
                    setErrors({ error: "Invalid credentials" })
                } else if (err.response.status === 403) {
                    setErrors({ error: "Email in use" })
                } else {
                    setErrors({ error: "Service unavailable :(" })
                }
            })
    }

    return (
        <div className="wrapper">
            <Container>
                <Form className="formStyle">
                    <Form.Group controlId="formInputEmail">
                        <Form.Label>
                            Email *
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formInputUsername">
                        <Form.Label>
                            Username *
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formInputPassword">
                        <Form.Label>
                            Password *
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formInputPassword2">
                        <Form.Label>
                            Check-password *
                        </Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Re-Enter password"
                            value={pw2}
                            onChange={(e) => setPw2(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={submitForm}>
                        Create new account
                    </Button>
                    <span className="spanTxt">or</span>
                    <Button variant="primary" onClick={() => history.replace("/login")}>
                        Sign in
                    </Button>
                    {renderError()}
                </Form>
            </Container>
        </div>
    )
}


export default Signup;
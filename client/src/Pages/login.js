import React, { Component } from "react";
import { Row, Form, Button, Col, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import '../App.css';
import { baseUrl } from "../config/cons";

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            error: false
        }

        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.loginRequest = this.loginRequest.bind(this);
    }

    componentDidMount() {
    }

    loginRequest() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.email,
                password: this.state.password
            })
        };

        fetch(baseUrl + "/login", requestOptions)
            .then(res => {
                if(!res.ok){
                    throw new Error(res)
                }
                return res.json()
            })
            .then(
                (result) => {
                    console.log(result);
                    if(result.token){
                        localStorage.setItem('token', result.token);
                        this.props.history.push("/")
                    }
                },
                (error) => {
                    this.setState({
                        error: true
                    });
                }
            )
            .catch(err => {
                console.log(err);
            });
    }

    emailChange(event) {
        this.setState({ email: event.target.value })
    }

    passwordChange(event) {
        this.setState({ password: event.target.value })
    }

    render() {

        let styles = {
            marginRight: '0px',
            marginLeft: '0px',
        };

        return (
            <Row style={styles} className="justify-content-center h-100 align-items-center" >
                <Col md={4}>
                    <Card>
                        <Card.Header>
                            <Card.Title mt={2}>
                                <h4>Log in</h4>
                            </Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                { this.state.error ? <AlertDismissibleExample /> : null }
                                <Form.Group>
                                    <Form.Label>Username or Email</Form.Label>
                                    <Form.Control className="field-config" onChange={evt => this.emailChange(evt)} type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={evt => this.passwordChange(evt)} type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group>

                                </Form.Group>
                                <div className="form-group">
                                    <Button variant="outline-info" onClick={() => this.loginRequest()}>Log in</Button>{ }
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Body className="my-border-top text-center">
                            Don't have an account? <a href="/register" style={{ color: "#ffc68a" }}>Sign up</a>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }
}

const  AlertDismissibleExample = () => {
    return (
      <Alert variant="danger">
          Incorrect username/email or passowrd.
      </Alert>
    );
}

export default login;

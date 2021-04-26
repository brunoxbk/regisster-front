import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './pages/Login';
import Logout from './pages/Logout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Register from './pages/Register';

import PrivateRoute from './components/routes/PrivateRoute';
import PublicRoute from './components/routes/PublicRoute';
import { getToken } from './utils/common';

import { Row, Col, Navbar, Nav, Form, FormControl, Button, Container } from 'react-bootstrap';



const Routes = () => {
    // const [authLoading, setAuthLoading] = useState(true);
    const [token, setToken] = useState(false);

    useEffect(() => {
        setToken(getToken());
        console.log(token);
        if (!token) {
            return;
        }

        // TODO: post
        // axios.get(`http://localhost:8000/auth/login/`).then(response => {
        //     setUserSession(response.data.token, response.data.user);
        //     setAuthLoading(false);
        // }).catch(error => {
        //     removeUserSession();
        //     setAuthLoading(false);
        // });
    }, []);
    //authLoading && getToken()
    // if (!getToken()) {
    //     return <div className="content">Checking Authentication...</div>
    // }

    return (

        <BrowserRouter>
            <div>
                {/* <div className="header">
                    <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    <NavLink activeClassName="active" to="/login">Login</NavLink>
                    <NavLink activeClassName="active" to="/teste">Teste</NavLink>
                </div> */}
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link to="/" as={NavLink} >Home</Nav.Link>
                        <Nav.Link to="/register" as={NavLink} >Registrar</Nav.Link>
                        <Nav.Link to="/dashboard" as={NavLink} >Dashboard</Nav.Link>
                        <Nav.Link to="/login" as={NavLink} >Login</Nav.Link>
                        <Nav.Link to="/logout" as={NavLink} >Sair</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path="/" component={Home} />
                                <PublicRoute path="/login" component={Login} />
                                <PublicRoute path="/register" component={Register} />
                                <PrivateRoute path="/logout" render={Logout} />
                                <PrivateRoute path="/dashboard" component={Dashboard} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </div>
        </BrowserRouter>

    );
}

export default Routes;
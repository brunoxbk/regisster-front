import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, Row, Form, Alert } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const schemaLogin = yup.object().shape({
    username: yup.string().required('O username não pode ser vazio'),
    password: yup.string().required('A senha não pode ser vazia'),
});


const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaLogin)
    });

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        axios.post(`${process.env.REACT_APP_HOST}/auth/login/`, data).then(response => {
            console.log(response);
            setLoading(false);

            setUserSession(response.data.token, response.data.user);
            props.history.push('/dashboard');


        }).catch(error => {
            console.log('error');
            if (error.response) {
                setError(error.response.data.non_field_errors);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }

            setLoading(false);
        });
    }


    return (
        <Row className="mt-4">
            <Col xs={12} md={4} lg={4} ></Col>
            <Col xs={12} md={4} lg={4} >

                <h2 className="text-center mt-3 mb-3">Login</h2>

                {error.map((error, ide) => <Alert key={ide} variant='warning'>{error}</Alert>)}
                <Form>
                    <Form.Group controlId="id_email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            {...register("username")}
                            type="text"
                            placeholder="Username" />
                        <Form.Text className="text-danger">{errors.username?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            {...register("password")}
                            type="password"
                            placeholder="Password" />
                        <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
                    </Form.Group>
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading}>{loading ? 'Loading...' : 'Login'}</Button>
                    <p className="mt-2">Não tem uma conta? clique <NavLink to='/register'>aqui</NavLink> e se inscreva</p>
                </Form>


            </Col>
            <Col xs={12} md={4} lg={4} ></Col>
        </Row>
    );
}


export default Login;
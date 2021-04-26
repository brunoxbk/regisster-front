import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Col, Row, Form, Alert } from 'react-bootstrap';


const schemaRegister = yup.object().shape({
    username: yup.string().required('O username não pode ser vazio'),
    first_name: yup.string().required('O nome não pode ser vazio'),
    last_name: yup.string().required('O sobrenome não pode ser vazio'),
    email: yup.string().email().required('A email não pode ser vazio'),
    password: yup.string().required('A senha não pode ser vazia'),
    password2: yup.string()
        .required('A confirmação não pode ser vazia')
        .oneOf([yup.ref('password'), null], 'A confirmação não bate com a senha'),
});


const Register = (props) => {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaRegister)
    });

    const onSubmit = (data) => {
        console.log(data);
        setLoading(true);
        axios.post(`http://${process.env.REACT_APP_HOST}/auth/register/`, data).then(response => {
            setLoading(false);
            //setUserSession(response.data.token, response.data.user);
            props.history.push('/login');
        }).catch(error => {
            console.log('error');
            if (error.response) {
                for (var key in error.response.data) {
                    // setFormError(error.response.data.non_field_errors);
                    setFormError(error.response.data[key]);
                }

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

                <h2 className="text-center mt-3 mb-3">Registro</h2>
                {formError.map((error, ide) => <Alert key={ide} variant='warning'>{error}</Alert>)}
                <Form>
                    <Form.Group controlId="id_username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            {...register("username")}
                            type="text"
                            placeholder="Username" />
                        <Form.Text className="text-danger">{errors.username?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            {...register("email")}
                            type="email"
                            placeholder="Email" />
                        <Form.Text className="text-danger">{errors.email?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_first_name">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            {...register("first_name")}
                            type="text"
                            placeholder="Nome" />
                        <Form.Text className="text-danger">{errors.first_name?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_last_name">
                        <Form.Label>Sobrenome</Form.Label>
                        <Form.Control
                            {...register("last_name")}
                            type="text"
                            placeholder="Sobrenome" />
                        <Form.Text className="text-danger">{errors.last_name?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_password">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control
                            {...register("password")}
                            type="password"
                            placeholder="Password" />
                        <Form.Text className="text-danger">{errors.password?.message}</Form.Text>
                    </Form.Group>

                    <Form.Group controlId="id_password2">
                        <Form.Label>Confirmação</Form.Label>
                        <Form.Control
                            {...register("password2")}
                            type="password"
                            placeholder="Confirmação" />
                        <Form.Text className="text-danger">{errors.password2?.message}</Form.Text>
                    </Form.Group>
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading}>{loading ? 'Loading...' : 'Registrar'}</Button>
                </Form>


            </Col>
            <Col xs={12} md={4} lg={4} ></Col>
        </Row>
    );
}


export default Register;
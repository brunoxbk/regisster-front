
import { Button, Col, Row, Form, Alert, Modal } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from 'react';
import axios from 'axios';


const schemaMovement = yup.object().shape({
    kind: yup.string().required('Escolha um tipo de movimentação'),
    description: yup.string().required('A descrição não pode ser vazia'),
    date: yup.string().required('A data da movimentação não pode ser vazia'),
    received_date: yup.string(),
    value: yup.number().required('O valor não pode ser vazio'),
});


const ModalMovement = (props) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schemaMovement)
    });

    const onSubmit = (data) => {
        data.user = props.user.id;
        console.log(data);

        setLoading(true);
        axios.post(`http://${process.env.REACT_APP_HOST}/cashbook/`, data).then(response => {
            console.log(response);
            props.getMovements()
            setLoading(false);
            props.modalClose();


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
        <Modal show={props.modalShow}>
            <Modal.Header closeButton>
                <Modal.Title>Nova Movimentação</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row>
                    <Col>

                        {error.map((error, ide) => <Alert key={ide} variant='warning'>{error}</Alert>)}
                        <Form>

                            <Form.Group controlId="id_kind">
                                <Form.Label>Tipo</Form.Label>
                                <Form.Control as="select"  {...register("kind")}>
                                    <option value="REVENUE">Receita</option>
                                    <option value="EXPENSE">Despesa</option>
                                </Form.Control>
                                <Form.Text className="text-danger">{errors.kind?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="id_description">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control
                                    {...register("description")}
                                    type="text"
                                    placeholder="Descrição" />
                                <Form.Text className="text-danger">{errors.description?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="id_date">
                                <Form.Label>Data</Form.Label>
                                <Form.Control
                                    {...register("date")}
                                    type="date"
                                    placeholder="Data" />
                                <Form.Text className="text-danger">{errors.date?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="id_received_date">
                                <Form.Label>Data Recebimento</Form.Label>
                                <Form.Control
                                    {...register("received_date")}
                                    type="date"
                                    placeholder="Data de Recebimento" />
                                <Form.Text className="text-danger">{errors.received_date?.message}</Form.Text>
                            </Form.Group>

                            <Form.Group controlId="id_value">
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    {...register("value")}
                                    type="number"
                                    placeholder="Valor" />
                                <Form.Text className="text-danger">{errors.value?.message}</Form.Text>
                            </Form.Group>

                            <Button variant="secondary" onClick={() => props.modalClose()}>Cancelar</Button>
                            <Button onClick={handleSubmit(onSubmit)} disabled={loading}>{loading ? 'Loading...' : 'Salvar'}</Button>

                        </Form>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>

            </Modal.Footer>
        </Modal>
    );
}

export default ModalMovement;

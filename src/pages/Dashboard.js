import { useState, useEffect } from 'react';
import { getUser } from './../utils/common';
import ModalMovement from './../components/ModalMovement';
import { Button, Col, Row, Table } from 'react-bootstrap';
import axios from 'axios';

function Dashboard(props) {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);
  const [movements, setMovements] = useState([]);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);

  const getMovements = () => {
    axios.get(`http://${process.env.REACT_APP_HOST}/cashbook/`)
      .then((response) => setMovements(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  useEffect(() => {
    setUser(getUser());
    getMovements()
  }, []);

  useEffect(() => {
    console.log(movements)

    const s_receitas = movements.filter((i) => i.kind == 'REVENUE').reduce((a, b) => a + parseFloat(b.value), 0);
    setReceitas(s_receitas);

    const s_despesas = movements.filter((i) => i.kind != 'REVENUE').reduce((a, b) => a + parseFloat(b.value), 0);
    setDespesas(s_despesas);
  }, [movements]);



  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h3>Welcome {user.username}!</h3>
            <h5>Suas Movimentações</h5>
            <Button onClick={() => setShow(!show)}>Nova movimentação</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Tipo</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                {movements.map((item) => (
                  <tr key={item.id} className={item.kind == 'REVENUE' ? 'table-success' : 'table-danger'}>
                    <td>{item.id}</td>
                    <td>{item.kind == 'REVENUE' ? 'Receita' : 'Despesa'}</td>
                    <td>{item.description}</td>
                    <td>{item.date}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
                <tr >
                  <th>#</th>
                  <th>#</th>
                  <th>#</th>
                  <th>Receitas</th>
                  <th>{receitas.toFixed(2)}</th>

                </tr>
                <tr>
                  <th>#</th>
                  <th>#</th>
                  <th>#</th>
                  <th>Despesas</th>
                  <th>{despesas.toFixed(2)}</th>

                </tr>
                <tr>
                  <th>#</th>
                  <th>#</th>
                  <th>#</th>
                  <th>Saldo</th>
                  <th>{(receitas - despesas).toFixed(2)}</th>

                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <ModalMovement modalShow={show} modalClose={() => setShow(false)} user={user} getMovements={() => getMovements()} />
      </Col>
    </Row>

  );
}

export default Dashboard;
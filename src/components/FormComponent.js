import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

function ButtonTypes(props) {
    return(
        <Col xs={{span:8, offset:2}} sm={{span:6, offset:0}} xl={{span:4, offset:0}} className="mt-2">
            <Button variant="primary" block name={props.name} onClick={props.onClick} style={{height:"50px"}}>
                        <Form.Check type="checkbox" name={props.name} onChange={props.onClick} checked={props.state} style={{display:"inline"}}/> {props.name}
            </Button>
        </Col>
    );
}

class HorrorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Comedy: false,
            Thriller: false,
            Drama: false,
            Mystery: false,
            from: 0,
            to: 0,
            exact: 0,
            info: "",
            database: []
        };
        
        this.buttonTypes = this.buttonTypes.bind(this);
    }

    componentDidMount() {
        fetch("https://antran1245.github.io/data/movies.json")
        .then(res => res.json())
        .then(data => {
            this.setState({
                database: data
            });
        },
        error => {
            this.setState({
                error
            })
        });
    }

    buttonTypes(event) {
        this.setState({
            [event.target.name]: (this.state[event.target.name] === false ? true : false)
        });
        console.log(this.state.database[0]);
    }

    render() {
        return(
            <Container>
                <Row>
                <Col xs={{span:12}} sm={{span:8, offset:2}}>
                    <Card body className="form_container" style={{color:"white"}}>
                        <Form>
                        <Form.Group>
                            <Form.Label>Choose types:</Form.Label>
                            <Row>
                                <ButtonTypes onClick={this.buttonTypes} state={this.state.Comedy} name={"Comedy"}/>
                                <ButtonTypes onClick={this.buttonTypes} state={this.state.Thriller} name={"Thriller"}/>
                                <ButtonTypes onClick={this.buttonTypes} state={this.state.Drama} name={"Drama"}/>
                                <ButtonTypes onClick={this.buttonTypes} state={this.state.Mystery} name={"Mystery"}/>
                            </Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year</Form.Label>
                            <Form.Row>
                                <Form.Label column xs={{span: 3}} sm={{span:1}} className="mt-2 mt-sm-0">From:</Form.Label>
                                <Col xs={{span: 8}} sm={{span:2}}>
                                    <Form.Control as="input"/>
                                </Col>
                                <Form.Label column xs={{span: 3}} sm={{span:1, offset:1}} className="mt-2 mt-sm-0">To:</Form.Label>
                                <Col xs={{span: 8}} sm={{span:2}}>
                                    <Form.Control as="input"/>
                                </Col>
                                <Form.Label column xs={{span: 3}} sm={{span:1, offset:1}} className="mt-2 mt-sm-0">Exact:</Form.Label>
                                <Col xs={{span: 8}} sm={{span:2}}>
                                    <Form.Control as="input"/>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Additional Information</Form.Label>
                            <Form.Control as="textarea" rows={3}/>
                        </Form.Group>
                        <Form.Row className="justify-content-center">
                            <Col xs={12} sm={{span:6}}>
                                <Button block>Submit</Button>
                            </Col>
                        </Form.Row>
                        </Form>
                    </Card>
                </Col>
                </Row>
            </Container>
        );
    }
}

export default HorrorForm;
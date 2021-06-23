import React, { Component } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import ResultDisplay from './ResultComponent';

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
            Crime: false,
            from: 0,
            to: 0,
            exact: 0,
            info: "",
            database: [],
            showModal: false,
            passInfo: [],
            genres: []
        };
        this.submitButton = this.submitButton.bind(this);
        this.buttonTypes = this.buttonTypes.bind(this);
    }

    componentDidMount() {
        fetch("http://my-json-server.typicode.com/antran1245/horrorAPI/movies")
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
        if(this.state[event.target.name] === false) {
            this.setState({
                genres: this.state.genres.concat(event.target.name)
            });
        } else if(this.state[event.target.name] === true) {
            this.setState({
                genres: this.state.genres.filter(item => item !== event.target.name)
            });
        }
    }

    submitButton() {
        var result = []
        if(this.state.Comedy === true) {
            result = this.state.database.filter(item => item['Genres'].includes('Comedy'));
        } else {
            result = result.concat(this.state.database);
        }
        if(this.state.Thriller === true) {
            result = result.filter(item => item['Genres'].includes('Thriller'));
        }
        if(this.state.Drama === true) {
            result = result.filter(item => item['Genres'].includes('Drama'));
        }
        if(this.state.Crime === true) {
            result = result.filter(item => item['Genres'].includes('Crime'));
        }
        this.setState({
            showModal: true,
            passInfo: result
        });
        console.log(result);
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
                                <ButtonTypes onClick={this.buttonTypes} state={this.state.Crime} name={"Crime"}/>
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
                                <Button block onClick={this.submitButton}>Submit</Button>
                            </Col>
                        </Form.Row>
                        </Form>
                    </Card>
                    <ResultDisplay show={this.state.showModal} info={this.state.passInfo} hide={()=>this.setState({showModal: false})}/>
                </Col>
                </Row>
            </Container>
        );
    }
}

export default HorrorForm;
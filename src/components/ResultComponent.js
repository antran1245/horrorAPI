import React from 'react';
import {Modal, Container} from 'react-bootstrap';

function ResultDisplay(props){
        return(
            <Modal show={props.show} onHide={props.hide} style={{maxHeight: "100%"}}>
                <Container fluid>
                    <h1 style={{textAlign:"center"}}>Movies</h1>
                    <Modal.Body>
                        {props.info.map(element =>{
                            return <React.Fragment key={element['Title']}>
                                <h3>{element['Title']}</h3>
                                <h5>{element['Genres'].replace('Horror|','').replaceAll('|', ',')}</h5>
                                <h5>{element['Release Date']} , {element['Release Country']}</h5>
                                <h5>{element['Movie Rating']}</h5>
                                <h5>{element['Movie Run Time']}</h5>
                                <h5>{element['Plot']}</h5>
                                <h5>{element['Cast'].replaceAll('|', ', ')}</h5>
                            </React.Fragment>
                        })}
                    </Modal.Body>
                </Container>
            </Modal>
        );
    }

export default ResultDisplay;
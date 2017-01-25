import React from 'react';
import ReactDOM from 'react-dom';

import {Grid, Row, Col, code, Button} from 'react-bootstrap';
import {Link, Route, Router, browserHistory} from 'react-router';
import CreateCharacter from './components/createCharacter.jsx';

// import Client from './components/client.jsx';
require('./stylesheets/styles.scss');

class NoMatch extends React.Component{
    render(){
        return(
             <div>
    <h3>404 page not found</h3>
    <p>We are sorry but the page you are looking for does not exist.</p>
  </div>
        );
    }
}

class MainComponent extends React.Component {
    render() {
        return (
            <Grid>
                <Row className="show-grid" id="body-header">
                    <Col xs={6} md={4}></Col>
                    <Col xs={6} md={4}>
                        <h1
                            style={{
                            color: 'green',
                            textAlign: 'center'
                        }}>Welcome!</h1>
                    </Col>
                    <Col xsHidden md={4}></Col>
                </Row>
                <Row className="show-grid" id="body-main">
                    <Col xs={6} md={6}>
                        <Link
                            to={{
                            pathname: 'http://localhost:8080/public/create-character',
                            query: {
                                newCharacter: false,
                                loadCharacter: true
                            }
                        }}>
                            <Button bsStyle="primary" bsSize="large" block>Load a Character</Button>
                        </Link>
                    </Col>
                    <Col xs={6} md={6}>
                        <Link
                            to={{
                            pathname: 'http://localhost:8080/public/create-character',
                            query: {
                                newCharacter: true,
                                loadCharacter: false
                            }
                        }}>
                            <Button bsStyle="primary" bsSize="large" block>Create a Character</Button>
                        </Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component="">

        <Route path ="/public/"component={MainComponent}></Route>
        <Route path="./create-character" component={CreateCharacter}></Route>
        
    </Route>
    </Router>
), document.getElementById('react-entry'));
import React from 'react';
import ReactDOM from 'react-dom';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'; import
// injectTapEventPlugin from 'react-tap-event-plugin'; // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();

import {Grid, Row, Col, code, Button} from 'react-bootstrap';
import {Link, Route, Redirect, Router, browserHistory} from 'react-router';
import CreateCharacter from './components/createCharacter.jsx';

// import Client from './components/client.jsx';
require('./stylesheets/styles.scss');

class NoMatch extends React.Component {
    render() {
        return (
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
                            className="btn btn-large btn-primary btn-block"
                            role="button"
                            style={{
                            padding: '10px',
                            fontSize: '20px'
                        }}
                            to={{
                            pathname: 'http://localhost:8080/public/characters'
                        }}>
                            Load a Character
                        </Link>
                    </Col>
                    <Col xs={6} md={6}>
                        <Link
                            className="btn btn-large btn-primary btn-block"
                            role="button"
                            style={{
                            padding: '10px',
                            fontSize: '20px'
                        }}
                            to={{
                            pathname: 'http://localhost:8080/public/characters/new'
                        }}>
                            Create A Character
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
            <Redirect from="/" to="/public/"/>
            <Route path="public" component={MainComponent}>
                <Route path="characters" component={CreateCharacter}/>
            </Route>
        </Route>
    </Router>
), document.getElementById('react-entry'));
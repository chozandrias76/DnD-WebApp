const React = require('react');
const ReactDOM = require('react-dom');

const {Grid, Row, Col} = require('react-bootstrap')
const {Link, Router, Route, browserHistory} = require('react-router')
const CharacterComponent = require('./components/character/character.jsx');

require("!style-loader!css-loader!sass-loader!./stylesheets/styles.scss")

const NoMatch = React.createClass(({
    render: function () {
        return (
            <div>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        );
    }
}))

const MainComponent = React.createClass(({
    render: function () {
        return (
            <Grid>
                <Row className="show-grid" id="body-header">
                    <Col xs={6} md={4}></Col>
                    <Col xs={6} md={4}>
                        <h1>Welcome!</h1>
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
                            pathname: '/characters'
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
                            pathname: '/characters/new'
                        }}>
                            Create A Character
                        </Link>
                    </Col>
                </Row>
            </Grid>
        );
    }
}))

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="public"  component={MainComponent}/>
        <Route path="characters" component={CharacterComponent}/>
        <Route path="characters/:subroute" component={CharacterComponent}>
        </Route>
    </Router>
), document.getElementById('react-entry'));
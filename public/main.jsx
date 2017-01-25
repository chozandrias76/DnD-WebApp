var React = require('react');
var ReactDOM = require('react-dom');

var ReactBootstrap = require('react-bootstrap')
var ReactRouter = require('react-router')
var CreateCharacter = require('./components/createCharacter.jsx');

// import Client from './components/client.jsx';
require('./stylesheets/styles.scss');

var NoMatch = React.createClass(({
    render: function () {
        return (
            <div>
                <h3>404 page not found</h3>
                <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        );
    }
}))

var MainComponent = React.createClass(({
    render: function () {
        return (
            <ReactBootstrap.Grid>
                <ReactBootstrap.Row className="show-grid" id="body-header">
                    <ReactBootstrap.Col xs={6} md={4}></ReactBootstrap.Col>
                    <ReactBootstrap.Col xs={6} md={4}>
                        <h1
                            style={{
                            color: 'green',
                            textAlign: 'center'
                        }}>Welcome!</h1>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xsHidden md={4}></ReactBootstrap.Col>
                </ReactBootstrap.Row>
                <ReactBootstrap.Row className="show-grid" id="body-main">
                    <ReactBootstrap.Col xs={6} md={6}>
                        <ReactRouter.Link
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
                        </ReactRouter.Link>
                    </ReactBootstrap.Col>
                    <ReactBootstrap.Col xs={6} md={6}>
                        <ReactRouter.Link
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
                        </ReactRouter.Link>
                    </ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Grid>
        );
    }
}))

ReactDOM.render((
    <ReactRouter.Router history={ReactRouter.browserHistory}>
        <ReactRouter.Route path="/">
            <ReactRouter.Redirect from="/" to="/public/"/>
            <ReactRouter.Route path="public" component={MainComponent}>
                <ReactRouter.Route path="characters" component={CreateCharacter}/>
            </ReactRouter.Route>
        </ReactRouter.Route>
    </ReactRouter.Router>
), document.getElementById('react-entry'));
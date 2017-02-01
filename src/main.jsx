const React = require('react');
const ReactDOM = require('react-dom');

const { Grid, Row, Col } = require('react-bootstrap');
const { Link, Router, Route, browserHistory } = require('react-router');
const CharacterComponent = require('./components/character/character.jsx');

require('./stylesheets/styles.scss');

const NoMatch = React.createClass(({// Basically our 404 page
  render() {
    return (
      <div>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    );
  },
}));

const MainComponent = React.createClass(({ // This is the splash page for the website
  render() {
    return (
      <Grid>
        {/* This top row just contains a welcome message*/}
        <Row className="show-grid body-header">
          <Col xs={6} md={4} />
          <Col xs={6} md={4}>
            <h1>Welcome!</h1>
          </Col>
          <Col xsHidden md={4} />
        </Row>
        {/* This row contains the two buttons for navigating away from the main page*/}
        <Row className="show-grid" id="body-main">
          <Col xs={6} md={6}>
            {/* Using Link means we pass navigation through react-router and don't
             actually use server side routing*/}
            <Link
              className="btn btn-large btn-primary btn-block front-navigation-buttons"
              role="button"
              to={{
                pathname: '/characters',
              }}
            >
            Load a Character
            </Link>
          </Col>
          <Col xs={6} md={6}>
            <Link
              className="btn btn-large btn-primary btn-block front-navigation-buttons"
              role="button"
              to={{
                pathname: '/characters/new',
              }}
            >
            Create A Character
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  },
}));

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="public" component={MainComponent} />
    <Route path="characters" component={CharacterComponent} />
    <Route path="characters/:subroute" component={CharacterComponent} />
    <Route path="*" component={NoMatch} />
  </Router>
), document.getElementById('react-entry'));

const React = require('react');
const ReactDOM = require('react-dom');

const {
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
    HelpBlock,
    Grid,
    Row,
    Col,
    InputGroup,
    Button
} = require('react-bootstrap')

const Character = React.createClass(({
    //     getValidationState() {     const length = this.state.value.length;     if
    // (length > 10) return 'success';     else if (length > 5) return 'warning';
    //  else if (length > 0) return 'error';   },   handleChange(e) {
    // this.setState({ value: e.target.value });   },
    renderContent(subroute) {
        if (subroute == "new") {
            return (
                <div>
                    <h1>Create Character</h1>
                    
                    <Grid
                        style={{
                        padding: '50px',
                        width: '100%'
                    }}>
                        <Row
                            className=""
                            style={{
                            width: '100%'
                        }}>
                            <Col md={2}>
                                Name
                            </Col>
                            <Col md={8}>
                                
                            </Col>
                            <Col md={2}>
                                
                            </Col>
                        </Row>
                    </Grid>

                </div>
            )
        } else if (subroute == "load") {
            return (
                <p>load</p>
            )
        } else if (subroute === undefined) {
            return (
                <h1>character list</h1>
            )
        } else {
            return (
                <p>bad url</p>
            )
        }
    },
    render: function () {
        return (this.renderContent(this.props.params.subroute));
    }
}))

module.exports = Character;
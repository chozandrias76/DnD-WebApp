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
    Button,
    Well
} = require('react-bootstrap')

const {Link} = require('react-router')

const Character = React.createClass(({
    renderContent(subroute) {
        if (subroute == "new") {
            return (
                <div>

                    <Grid
                        style={{
                        padding: '50px',
                        width: '100%'
                    }}>
                        <h1>Create Character</h1>
                        <div id="character-sheet-body">
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Name</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <Form horizontal>
                                        <FormControl type="text" placeholder="Nedberth the Red"/>
                                    </Form>
                                </Col>
                                <Col md={2}>
                                    <Link
                                        className="btn btn-large btn-success"
                                        role="button"
                                        to={{
                                        pathname: '/characters/save'
                                    }}>
                                        Save Character
                                    </Link>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Background</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <Form horizontal>
                                        <FormControl type="text" placeholder="Soldier"/>
                                    </Form>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Personality Traits</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act."/>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Ideals</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="Respect. People deserve to be treated with dignity and courtesy."/>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Bonds</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members."/>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}>
                                    <ControlLabel className="character-forum-description">Flaws</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        componentClass="textarea"
                                        placeholder="I secretly wonder heather the gods care about mortal affairs at all."/>
                                </Col>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}/>
                                <Col md={4}>
                                    <Well >
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Class</Col>
                                                <Col md={10}>
                                                    <FormControl componentClass="select" placeholder="Fighter">
                                                        <option value="select">Fighter</option>
                                                        <option value="other">Wizard</option>
                                                        <option value="other">Cleric</option>
                                                        <option value="other">Rogue</option>
                                                        <option value="other">Ranger</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Alignment</Col>
                                                <Col md={10}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">Lawful Good</option>
                                                        <option value="other">Lawful Neutral</option>
                                                        <option value="other">Lawful Evil</option>
                                                        <option value="select">Neutral Good</option>
                                                        <option value="other">True Neutral</option>
                                                        <option value="other">Neutral Evil</option>
                                                        <option value="select">Chaotic Good</option>
                                                        <option value="other">Chaotic Neutral</option>
                                                        <option value="other">Chaotic Evil</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Level</Col>
                                                <Col md={10}>
                                                    <FormControl componentClass="select" placeholder="1">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Exp</Col>
                                                <Col md={10}>
                                                    <Form horizontal>
                                                        <FormControl type="text" placeholder="0"/>
                                                    </Form>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Well>
                                </Col>
                                <Col md={4}>
                                    <Well >
                                        <Form horizontal style={{marginBottom:0}}>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Init.</Col>
                                                <Col md={10}>
                                                    <Form horizontal>
                                                        <FormControl type="text" placeholder="-1"/>
                                                    </Form>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Speed</Col>
                                                <Col md={10}>
                                                   <Form horizontal>
                                                        <FormControl type="text" placeholder="25 Feet"/>
                                                    </Form>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Max. HP</Col>
                                                <Col md={10}>
                                                    <Form horizontal>
                                                        <FormControl type="text" placeholder="11"/>
                                                    </Form>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>Hit Dice</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col componentClass={ControlLabel} md={2}>d</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">8</option>
                                                        <option value="other">7</option>
                                                        <option value="other">6</option>
                                                        <option value="other">5</option>
                                                        <option value="other">4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Well>
                                </Col>
                                <Col md={2}/>
                            </Row>
                            <Row
                                style={{
                                paddingTop: '25px'
                            }}>
                                <Col md={2}/>
                                <Col md={4}>
                                    <Well >
                                          <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>STR</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>DEX</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>CON</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                          <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>INT</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>WIS</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        <Form horizontal>
                                            <FormGroup controlId="formControlsSelect">
                                                <Col componentClass={ControlLabel} md={2}>CHA</Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">1</option>
                                                        <option value="other">2</option>
                                                        <option value="other">3</option>
                                                        <option value="other">4</option>
                                                        <option value="other">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl componentClass="select" placeholder="select">
                                                        <option value="select">+0</option>
                                                        <option value="other">+1</option>
                                                        <option value="other">+2</option>
                                                        <option value="other">+3</option>
                                                        <option value="other">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Well>
                                </Col>
                                <Col md={4}></Col>
                                <Col md={2}/>
                            </Row>
                        </div>
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
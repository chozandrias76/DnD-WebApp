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

    componentDidMount() {
        // When the component is mounted, grab a reference and add a DOM listener;
        var saveButton = document.getElementById('save-button');
        ReactDOM.findDOMNode()
        addEventListener(saveButton, 'click', function () {
            var elementsToSave = document.getElementsByClassName('character-sheet-field');
            console.log(elementsToSave);
        })
    },
    renderContent(subroute) {
        function saveClicked() {
            var jsonElements = [];
            var compiledJson = {};
            var elementsToSave = document.getElementsByClassName('character-sheet-field');
            []
                .forEach
                .call(elementsToSave, function (e) {
                    var obj = {}
                    obj.name = e.id;
                    obj.value = e.value;
                    obj.guid = guid();
                    jsonElements.push(obj);

                });
                function guid() {
                        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
                    }

                    function s4() {
                        return Math.floor((1 + Math.random()) * 0x10000)
                            .toString(16)
                            .substring(1);
                    }
                    compiledJson.characterData = jsonElements;
                    compiledJson.guid = guid();
            console.log(compiledJson);
            localStorage.setItem(`characterID: ${compiledJson.guid}`, compiledJson);
        }
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
                            {/*Name entry field and label*/}
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Name</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <Form horizontal>
                                        <FormControl
                                            id="name-field"
                                            className="character-sheet-field"
                                            type="text"
                                            placeholder="Nedberth the Red"/>
                                    </Form>
                                </Col>
                                <Col md={2}>
                                    {/*A button for saving the character sheet*/}
                                    <Link
                                        onClick={saveClicked}
                                        id="save-button"
                                        className="btn btn-large btn-success"
                                        role="button">
                                        Save Character
                                    </Link>
                                </Col>
                            </Row>
                            {/*Character background field and label*/}
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Background</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <Form horizontal>
                                        <FormControl
                                            id="background-field"
                                            className="character-sheet-field"
                                            type="text"
                                            placeholder="Soldier"/>
                                    </Form>
                                </Col>
                            </Row>
                            {/*Character personality traits field and label*/}
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Personality Traits</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        id="personality-field"
                                        className="character-sheet-field"
                                        componentClass="textarea"
                                        placeholder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act."/>
                                </Col>
                                {/*Character ideals field and label*/}
                            </Row>
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Ideals</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        id="ideals-field"
                                        className="character-sheet-field"
                                        componentClass="textarea"
                                        placeholder="Respect. People deserve to be treated with dignity and courtesy."/>
                                </Col>
                            </Row>
                            {/*Character bonds field and label*/}
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Bonds</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        id="bonds-field"
                                        className="character-sheet-field"
                                        componentClass="textarea"
                                        placeholder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members."/>
                                </Col>
                            </Row>
                            {/*Character flaws field and label*/}
                            <Row className="character-sheet-row">
                                <Col md={2}>
                                    <ControlLabel className="character-form-description">Flaws</ControlLabel>
                                </Col>
                                <Col md={8}>
                                    <FormControl
                                        id="flaws-field"
                                        className="character-sheet-field"
                                        componentClass="textarea"
                                        placeholder="I secretly wonder heather the gods care about mortal affairs at all."/>
                                </Col>
                            </Row>
                            <Row className="character-sheet-row">
                                <Col md={2}/>
                                <Col md={4}>
                                    <Well >
                                        {/*Character class dropdown and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Class</Col>
                                                <Col md={10}>
                                                    <FormControl
                                                        id="class-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="fighter">Fighter</option>
                                                        <option value="wizard">Wizard</option>
                                                        <option value="cleric">Cleric</option>
                                                        <option value="rogue">Rogue</option>
                                                        <option value="ranger">Ranger</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character alignment dropdown and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Alignment</Col>
                                                <Col md={10}>
                                                    <FormControl
                                                        id="alignment-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="lawful-good">Lawful Good</option>
                                                        <option value="lawful-neutral">Lawful Neutral</option>
                                                        <option value="lawful-evil">Lawful Evil</option>
                                                        <option value="neutral-good">Neutral Good</option>
                                                        <option value="true-neutral">True Neutral</option>
                                                        <option value="neutral-evil">Neutral Evil</option>
                                                        <option value="chaotic-good">Chaotic Good</option>
                                                        <option value="chaotic-neutral">Chaotic Neutral</option>
                                                        <option value="chaotic-evil">Chaotic Evil</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character level dropdown and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Level</Col>
                                                <Col md={10}>
                                                    <FormControl
                                                        id="level-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character exp field and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Exp</Col>
                                                <Col md={10}>

                                                    <FormControl
                                                        className="character-sheet-field"
                                                        id="exp-field"
                                                        type="text"
                                                        placeholder="0"/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Well>
                                </Col>
                                <Col md={4}>
                                    <Well >
                                        {/*Character initiative field and label*/}
                                        <Form
                                            horizontal
                                            style={{
                                            marginBottom: 0
                                        }}>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Init.</Col>
                                                <Col md={10}>

                                                    <FormControl
                                                        className="character-sheet-field"
                                                        id="initiative-field"
                                                        type="text"
                                                        placeholder="-1"/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character speed field and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Speed</Col>
                                                <Col md={10}>

                                                    <FormControl
                                                        id="speed-field"
                                                        className="character-sheet-field"
                                                        type="text"
                                                        placeholder="25 Feet"/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character max HP field and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>Max. HP</Col>
                                                <Col md={10}>

                                                    <FormControl
                                                        className="character-sheet-field"
                                                        id="hp-field"
                                                        type="text"
                                                        placeholder="11"/>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character hitdice and dice type dropdown and label*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                {/*Character hitdice dropdown and label*/}
                                                <Col componentClass={ControlLabel} md={2}>Hit Dice</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="hitdice-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                {/*Character dice type dropdown and label*/}
                                                <Col componentClass={ControlLabel} md={2}>d</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="hitdice-die-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="8">8</option>
                                                        <option value="7">7</option>
                                                        <option value="6">6</option>
                                                        <option value="5">5</option>
                                                        <option value="4">4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Well>
                                </Col>
                                <Col md={2}/>
                            </Row>
                            {/*Character stats and stat bonus dropdowns and labels*/}
                            <Row className="character-sheet-row">
                                <Col md={2}/>
                                <Col md={4}>
                                    <Well >
                                        {/*Character strength and strength bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>STR</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="strength-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="strength-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character dexterity and dexterity bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>DEX</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="dexterity-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="dexterity-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character constitution and constitution bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>CON</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="constitution-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                          <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="constitution-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                       <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character intelligence and intelligence bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>INT</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="intelligence-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="intelligence-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character wisdom and wisdom bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>WIS</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="wisdom-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="wisdom-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
                                                    </FormControl>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                        {/*Character charisma and charisma bonus dropdowns and labels*/}
                                        <Form horizontal>
                                            <FormGroup >
                                                <Col componentClass={ControlLabel} md={2}>CHA</Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="charisma-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </FormControl>
                                                </Col>
                                                <Col md={4}>
                                                    <FormControl
                                                        id="charisma-modifier-dropdown"
                                                        className="character-sheet-field"
                                                        componentClass="select"
                                                        placeholder="">
                                                        <option value="0">+0</option>
                                                        <option value="1">+1</option>
                                                        <option value="2">+2</option>
                                                        <option value="3">+3</option>
                                                        <option value="4">+4</option>
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
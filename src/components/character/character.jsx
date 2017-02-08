const React = require('react');
const ReactDOM = require('react-dom');

const {
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
    Grid,
    Row,
    Col,
    Well,
    Table,
    thead,
    tbody,
    Alert,
} = require('react-bootstrap');

const { browserHistory } = require('react-router');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm
const ReactTransitionGroup = require('react-addons-transition-group'); // ES5 with npm


const { Link } = require('react-router');
let currentCharacterGUID = ""
const Character = React.createClass(({
  getInitialState() {
    return {
      documentData: {
        showSaveAlert: false,
      },
    };
  },
  componentWillMount() {
    const initialData = document.getElementsByName('character-sheet-wrapper')[0] === undefined ? this.createInitialData() : document.getElementsByName('character-sheet-wrapper')[0].id;
    currentCharacterGUID = initialData;
    const newState = {
      [initialData]: {
        characterData: {},
      },
    };
    this.setState(() => {
      return Object.assign(localStorage.state === undefined ? (newState) : JSON.parse(localStorage.state), newState);
    });
  },
  componentDidUpdate(prevProps, prevState) {
    //  localStorage.setState(() => {
    //   return Object.assign(this.state, newData);
    // });
    console.log(this.state);
    console.log(localStorage.state);
    localStorage.state = JSON.stringify(Object.assign({}, this.state));
  },
  addSaveAlert() {
    this.setState({ documentData: {
      showSaveAlert: true,
    } });
    setTimeout(this.removeSaveAlert, 6000);
  },
  removeSaveAlert() {
    this.setState({ documentData: {
      showSaveAlert: false,
    } });
  },
  loadCharacter(guid) {
    const characterList = JSON.parse(localStorage.getItem('characters'));
    const fieldsToFill = document.getElementsByClassName('character-sheet-field');// This selector grabs all the elements on the page that are part of the character sheet
    const ourCharacter = characterList.some(character => character.guid === guid);
    []
            .forEach
            .call(fieldsToFill, (e) => {
              let dataToFill;
              const elementToFill = ourCharacter.data.some((fieldData) => { // Iterates through all the character data for this character and sets elementToFill to the corrisponding element
                dataToFill = fieldData; // Set the dataToFill every iteration. It only matters when this method returns and sets to the correct value
                return fieldData.key === e.id; // When the data's name corrisponds to the right element name elementToFill is set
              });
              elementToFill.value = dataToFill.value; // Each iteration, set the forum value to match the data grabbed from the character sheet in local storage
            });
  },
  // 4-character generator
  generateFour() {
    return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
  },
  // Guid generator function. Not really needed but, good plan if the project expands
  createInitialData() {
    const initialData = {};
    let gUID = [];
    for (let i = 0; i < 7; i += 1) {
      const nextPart = this.generateFour();
      gUID.push(nextPart);
      if (i > 0 && i < 5) {
        gUID.push('-');
      }
    }
    return gUID.join('');
  },

  saveCharacter() { // Our method for saving characters
    const characterList = JSON.parse(localStorage.getItem('characters'));// We want to get the characters in localstorage and translate from a string to a javascript object
    const fieldsToSave = document.getElementsByClassName('character-sheet-field');// This selector grabs all the elements on the page that are part of the character sheet
    const newCharacter = {};
    newCharacter.data = {};

    // Iterator function for saving fields
    function saveField(curr) {
      newCharacter.data[curr.id] = curr.value;
    }

    newCharacter.guid = document.getElementsByName('character-sheet-wrapper')[0].className();
        // fieldsToSave not technically an array so we call the array method
        // and apply the fields as though they were elements in an array
    []
            .forEach
            .call(fieldsToSave, (e) => {
              saveField(e);
            });
            // Add the new character to the list of characters
            // and put them in local storage as strings
    characterList.push(newCharacter);
    localStorage.setItem('characters', JSON.stringify(characterList));
  },
  handleTRClick(guid) {
    // console.log(guid);
    browserHistory.push({ pathname: 'characters/load', query: { guid } });
  },
  handleChange(e) {
    const characterSheetGUID = document.getElementsByName('character-sheet-wrapper')[0].id;
    const newData = { [characterSheetGUID]: { characterData: { [e.target.id]: e.target.value } } };
    //this.setState(newData);
    this.setState(() => {
      return Object.assign(this.state, newData);
    });
   
    this.handleSubmit(e.target.value);
  },
  mergeOptions(obj1,obj2){
    let obj3 = {};
    for (let attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (let attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
},
  handleSubmit(txt) {
    // this.props.onChange(txt);
  },
  defaultCharacterSheet(characterQuery) {
    const saveAlert = this.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '';
    if (characterQuery) console.log(characterQuery);
    return (
      <div name="character-sheet-wrapper" id={currentCharacterGUID}>
        <Grid
          style={{
            padding: '50px',
            width: '100%',
          }}
        >
          <h1>Create Character</h1>
          <div id="character-sheet-body">
            {/* Name entry field and label*/}
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
                    placeholder="Nedberth the Red"
                    onChange={this.handleChange}
                  />
                </Form>
              </Col>
              <Col md={2} id="save-button-container">
                {/* A button for saving the character sheet*/}
                <Link
                  onClick={this.saveCharacter && this.addSaveAlert}
                  id="save-button"
                  className="btn btn-large btn-success"
                  role="button"
                >
                  Save Character
                  </Link>
                <ReactCSSTransitionGroup
                  transitionName="save-alert"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={500}
                >
                  {saveAlert}
                </ReactCSSTransitionGroup>
              </Col>
            </Row>
            {/* Character background field and label*/}
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
                    placeholder="Soldier"
                  />
                </Form>
              </Col>
            </Row>
            {/* Character personality traits field and label*/}
            <Row className="character-sheet-row">
              <Col md={2}>
                <ControlLabel className="character-form-description">
                  Personality Traits</ControlLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="personality-field"
                  className="character-sheet-field"
                  componentClass="textarea"
                  placeholder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act."
                />
              </Col>
              {/* Character ideals field and label*/}
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
                  placeholder="Respect. People deserve to be treated with dignity and courtesy."
                />
              </Col>
            </Row>
            {/* Character bonds field and label*/}
            <Row className="character-sheet-row">
              <Col md={2}>
                <ControlLabel className="character-form-description">Bonds</ControlLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="bonds-field"
                  className="character-sheet-field"
                  componentClass="textarea"
                  placeholder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members."
                />
              </Col>
            </Row>
            {/* Character flaws field and label*/}
            <Row className="character-sheet-row">
              <Col md={2}>
                <ControlLabel className="character-form-description">Flaws</ControlLabel>
              </Col>
              <Col md={8}>
                <FormControl
                  id="flaws-field"
                  className="character-sheet-field"
                  componentClass="textarea"
                  placeholder="I secretly wonder weather the gods care about mortal affairs at all."
                />
              </Col>
            </Row>
            <Row className="character-sheet-row">
              <Col md={2} />
              <Col md={4}>
                <Well >
                  {/* Character class dropdown and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Class</Col>
                      <Col md={10}>
                        <FormControl
                          id="class-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
                          <option value="fighter">Fighter</option>
                          <option value="wizard">Wizard</option>
                          <option value="cleric">Cleric</option>
                          <option value="rogue">Rogue</option>
                          <option value="ranger">Ranger</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character alignment dropdown and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Alignment</Col>
                      <Col md={10}>
                        <FormControl
                          id="alignment-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                  {/* Character level dropdown and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Level</Col>
                      <Col md={10}>
                        <FormControl
                          id="level-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character exp field and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Exp</Col>
                      <Col md={10}>

                        <FormControl
                          className="character-sheet-field"
                          id="exp-field"
                          type="text"
                          placeholder="0"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </Well>
              </Col>
              <Col md={4}>
                <Well >
                  {/* Character initiative field and label*/}
                  <Form
                    horizontal
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Init.</Col>
                      <Col md={10}>

                        <FormControl
                          className="character-sheet-field"
                          id="initiative-field"
                          type="text"
                          placeholder="-1"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character speed field and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Speed</Col>
                      <Col md={10}>

                        <FormControl
                          id="speed-field"
                          className="character-sheet-field"
                          type="text"
                          placeholder="25 Feet"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character max HP field and label*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>Max. HP</Col>
                      <Col md={10}>

                        <FormControl
                          className="character-sheet-field"
                          id="hp-field"
                          type="text"
                          placeholder="11"
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character hitdice and dice type dropdown and label*/}
                  <Form horizontal>
                    <FormGroup >
                      {/* Character hitdice dropdown and label*/}
                      <Col componentClass={ControlLabel} md={2}>Hit Dice</Col>
                      <Col md={4}>
                        <FormControl
                          id="hitdice-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </FormControl>
                      </Col>
                      {/* Character dice type dropdown and label*/}
                      <Col componentClass={ControlLabel} md={2}>d</Col>
                      <Col md={4}>
                        <FormControl
                          id="hitdice-die-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
              <Col md={2} />
            </Row>
            {/* Character stats and stat bonus dropdowns and labels*/}
            <Row className="character-sheet-row">
              <Col md={2} />
              <Col md={4}>
                <Well >
                  {/* Character strength and strength bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>STR</Col>
                      <Col md={4}>
                        <FormControl
                          id="strength-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
                          <option value="0">+0</option>
                          <option value="1">+1</option>
                          <option value="2">+2</option>
                          <option value="3">+3</option>
                          <option value="4">+4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character dexterity and dexterity bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>DEX</Col>
                      <Col md={4}>
                        <FormControl
                          id="dexterity-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
                          <option value="0">+0</option>
                          <option value="1">+1</option>
                          <option value="2">+2</option>
                          <option value="3">+3</option>
                          <option value="4">+4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character constitution and constitution bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>CON</Col>
                      <Col md={4}>
                        <FormControl
                          id="constitution-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
                          <option value="0">+0</option>
                          <option value="1">+1</option>
                          <option value="2">+2</option>
                          <option value="3">+3</option>
                          <option value="4">+4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character intelligence and intelligence bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>INT</Col>
                      <Col md={4}>
                        <FormControl
                          id="intelligence-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
                          <option value="0">+0</option>
                          <option value="1">+1</option>
                          <option value="2">+2</option>
                          <option value="3">+3</option>
                          <option value="4">+4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character wisdom and wisdom bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>WIS</Col>
                      <Col md={4}>
                        <FormControl
                          id="wisdom-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
                          <option value="0">+0</option>
                          <option value="1">+1</option>
                          <option value="2">+2</option>
                          <option value="3">+3</option>
                          <option value="4">+4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
                  {/* Character charisma and charisma bonus dropdowns and labels*/}
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>CHA</Col>
                      <Col md={4}>
                        <FormControl
                          id="charisma-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                        >
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
                          placeholder=""
                        >
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
              <Col md={4} />
              <Col md={2} />
            </Row>
          </div>
        </Grid>
        {/* this.loadCharacter(characterQuery) */}
      </div>

    );
  },
  renderContent(subroute) { // Right now this file handles all the subroutes for /characters
    if (subroute === 'new') { // If we are creating a new character
      return (
       this.defaultCharacterSheet()
      );
    } else if (subroute === 'load') {
      return (
        this.defaultCharacterSheet(this.props.location.query.guid)
      );
      // return (
      //   <div>
      //     <p>{subroute}</p>
      //     <p>{this.props.location.query.guid}</p>
      //   </div>
      // );
    } else if (subroute === undefined) {
      /* This is the default route
      for /characters with no subroute. Just display all the characters here*/
      const allCharacters = JSON.parse(localStorage.getItem('characters')); // Grab all the characters from localstorage
      const characterRows = [];
      if (allCharacters.length > 0) {
        // Render the characters only if there are actually some to render
        allCharacters.forEach((character) => {
          characterRows.push(
            <tr key={character.guid} onClick={() => { this.handleTRClick(character.guid); }}>
              <td >{character.data['name-field']}</td>
              <td>{character.data['level-dropdown']}</td>
            </tr>);
        });
      } else { // Render an empty row if we have no characters
        characterRows.push(
          <tr key="none">
            <td>No characters created yet</td>
          </tr>);
      }
            // No matter what the contents of local storage is, render a header for the table
      return (
        <div>
          <Grid
            style={{
              padding: '50px',
              width: '100%',
            }}
          >
            <h1>Character List</h1>
            {/* The table just has a header with character name and level to start*/}
            <Row>
              <Col md={2} />
              <Col md={8}>
                <Table striped bordered condensed hover>
                  <thead>
                    <tr>
                      <th>Character Name</th>
                      <th>Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characterRows}
                  </tbody>
                </Table>
              </Col>
              <Col md={2} />
            </Row>
          </Grid>
        </div>
      );
    }
    return (
      <p>bad url</p>
    );
  },
  render() { // Render function determined by what the subroute is
    return (this.renderContent(this.props.params.subroute));
  },
}));

module.exports = Character;

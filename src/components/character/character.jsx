const React = require('react');
// const ReactDOM = require('react-dom');

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
    Button,
} = require('react-bootstrap');

const { browserHistory } = require('react-router');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm
// const ReactTransitionGroup = require('react-addons-transition-group'); // ES5 with npm
const { Link } = require('react-router');

let currentCharacterGUID = '';
let hasBeenSaved = localStorage.state === undefined ? false : Object.prototype.hasOwnProperty.call(JSON.parse(localStorage.state), currentCharacterGUID);

const CharacterSheetTextField = React.createClass({
  render() {
    return (
      <Row className="character-sheet-row">
        <Col md={2}>
          <ControlLabel className="character-form-description">{this.props.labelName}</ControlLabel>
        </Col>
        <Col md={8}>
          <Form horizontal>
            <FormControl
              id={this.props.divID}
              className="character-sheet-field"
              type="text"
              placeholder={this.props.placeHolder}
              onChange={this.props.onChange}
            />
          </Form>
        </Col>
      </Row>
    );
  },
});
const CharacterSheetStatDropdown = React.createClass({
  withModifierElements() {
    return this.props.withModifier ?
      (<Col md={4}>
        <FormControl
          id={`${this.props.divID}-modifier`}
          className="character-sheet-field"
          componentClass="select"
          placeholder=""
          onChange={this.handleChangingCharacterSheetElement}
        >
          <option value="-4">-4</option>
          <option value="-3">-3</option>
          <option value="-2">-2</option>
          <option value="-1">-1</option>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </FormControl>
      </Col>) :
            (<div />);
  },
  render() {
    return (
      <Form horizontal>
        <FormGroup >
          <Col componentClass={ControlLabel} md={2}>{this.props.labelName}</Col>
          <Col md={4}>
            <FormControl
              id={this.props.divID}
              className="character-sheet-field"
              componentClass="select"
              placeholder=""
              onChange={this.handleChangingCharacterSheetElement}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </FormControl>
          </Col>
          {this.withModifierElements()}
        </FormGroup>
      </Form>
    );
  },
});

const SaveAlert = React.createClass({
  getInitialState() { // Set in state when the page loads
    return (Object.prototype.hasOwnProperty.call(JSON.parse(localStorage.state), currentCharacterGUID) &&
     JSON.parse(localStorage.state)[currentCharacterGUID].characterData !== '{}') ?
    {
      documentData: {
        showSaveAlert: false,
      },
    } :
    {
      documentData: {
        showSaveAlert: true,
      },
    };
  },

  toggleSaveAlert() { // Toggles on and off our save alert when the button is pressed.
    if (Object.prototype.hasOwnProperty.call(this.state.documentData, 'showSaveAlert')) {
      if (this.state.documentData.showSaveAlert) {
        this.setState({ documentData: {
          showSaveAlert: false,
        } });
      } else {
        this.setState({ documentData: {
          showSaveAlert: true,
        } });
      }
    }
  },
  
  render() {
    if (this.state.documentData.showSaveAlert) {
      return (
        <Alert bsStyle="info" onDismiss={this.handleAlertDismiss} style={{ position: 'absolute', zIndex: 1 }}>
          <h4>You only need to click save once.</h4>
          <p>After clicking save, your character will automatically update when you make changes</p>
          <p>
            <Button onClick={this.toggleSaveAlert}>Hide Alert</Button>
          </p>
        </Alert>
      );
    }
    return null;
  },
});

const SaveButton = React.createClass({
  getInitialState() { // Set in state when the page loads
    return (Object.prototype.hasOwnProperty.call(JSON.parse(localStorage.state), currentCharacterGUID) &&
     JSON.parse(localStorage.state)[currentCharacterGUID].characterData !== '{}') ?
    {
      documentData: {
        showSaveButton: false,
      },
    }
      :
    {
      documentData: {
        showSaveButton: true,
      },
    };
  },

  toggleSaveButton() { // Toggles on and off our save alert when the button is pressed.
    if (Object.prototype.hasOwnProperty.call(this.state.documentData, 'showSaveButton')) {
      if (this.state.documentData.showSaveButton) {
        this.setState({ documentData: {
          showSaveButton: false,
        } });
      } else {
        this.setState({ documentData: {
          showSaveButton: true,
        } });
      }
    }
  },

  render() {
    if (this.state.documentData.showSaveButton) {
      return (
        <Button bsStyle="primary" onClick={ () => { this.toggleSaveButton(); this.props.onClick(); }} style={{ position: 'absolute', zIndex: 1 }}>Save</Button>
      );
    }
    return null;
  },

});

let subroute = '';

const Character = React.createClass(({
  getInitialState() { // Set in state when the page loads
    if (this.state === null) { // If nothing is in state,
      if (localStorage !== undefined && localStorage.state !== undefined) { // And if localstorage contains state
        return JSON.parse(localStorage.state); // Make our state match localstorage
      }
    }
    return this.state; // If we already have a state, we don't want to return anything different
  },

  componentWillMount() { // Called when a react component is about to mount
    let initialData = {};

    if (this.props.params.subroute === 'new') {
      initialData = document.getElementsByName('character-sheet-wrapper')[0] === undefined ?
      this.gUIDGenerator() : document.getElementsByName('character-sheet-wrapper')[0].id;

      currentCharacterGUID = initialData;
      const newState = {
        [initialData]: {
          characterData: {},
        },
      };

      this.setState(this.combineObjects(newState, localStorage.state === undefined ? {} : JSON.parse(localStorage.state)));
      this.syncState('reactState');
      localStorage.state = this.state === null ? '{}' : JSON.stringify(this.state);
    } else if (this.props.params.subroute === 'load') {
      currentCharacterGUID = this.props.location.query.guid;
      this.syncState('localStorageState');
    }
  },

  componentDidMount() { // Is called after the react component did mount
    /*
    Right now the only thing that needs to happen after a character component is mounted is load in data from state
    to appear properly on the fields from the last time it was edited
    */
    this.syncCharacterSheetValues();
  },
  
  componentDidUpdate() { // Is called after page updates in any way
    /*
    Right now the only thing that needs to happen after a character component is updated is load in data from state
    to appear properly on the fields from the last time it was edited
    */
    this.syncCharacterSheetValues();
  },

  syncCharacterSheetValues() {
    if (this.props.params.subroute === 'load') { // Only need to do things if we mounted the component after loading a character
      document.getElementsByName('character-sheet-wrapper')[0].id = currentCharacterGUID; // Updates the page with the proper guid for the loaded sheet
      const localStorageState = JSON.parse(localStorage.state); // Make a copy of the local storage state since you can't directly edit it as an object only as a string
      if (Object.prototype.hasOwnProperty.call(localStorageState, this.props.location.query.guid)) { // If there is a property that matches a GUID provided
        const stateFilledCharacterData = localStorageState[this.props.location.query.guid].characterData; // Set a copy of the character data in state
        Object.keys(stateFilledCharacterData).forEach((data) => { // For every property in the character data
          // Set our fields in the character sheet to match the data stored in local storage for that character
          document.getElementById(this.reportPropName(stateFilledCharacterData, stateFilledCharacterData[data])).value = stateFilledCharacterData[data];
        });
      }
    }
    if (hasBeenSaved) { // Only if a user has saved the first time does the condition pass
      this.syncState('reactState'); // Updates localStorage state by what reactState thinks is correct
    }
  },

  reportPropName(object, propertyValue) {
    let res = '';
    for (const i in object) {
      if (typeof object[i] === 'object') {
        if (this.reportPropName(object[i], propertyValue)) {
          return res;
        }
      } else if (object[i] === propertyValue) {
        res = i;
        return res;
      }
    }
    return undefined;
  },

  syncState(authoringState) {
    if (authoringState === 'localStorageState') {
      this.setState(JSON.parse(localStorage.state));
    } else if (authoringState === 'reactState') {
      localStorage.state = this.state === null ? '{}' : JSON.stringify(this.combineObjects(localStorage.state === undefined ? {} : JSON.parse(localStorage.state), this.state));
    }
  },

  /* eslint-disable no-param-reassign*/
  combineObjects(obj, src) { // Better than the vanilla method of copying properties because it updates the values instead of overwriting properties
    Object.keys(src).forEach((key) => { obj[key] = src[key]; });
    return obj;
  }, /* eslint-enable no-param-reassign*/

  // 4-character generator
  generateFour() {
    return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
  },

  // Guid generator function. Not really needed but, good plan if the project expands
  gUIDGenerator() {
    const gUID = [];
    for (let i = 0; i < 7; i += 1) {
      const nextPart = this.generateFour();
      gUID.push(nextPart);
      if (i > 0 && i < 5) {
        gUID.push('-');
      }
    }
    return gUID.join('');
  },

  // How to handle when a character is clicked in the menu displaying all characters in a table
  handleTRClick(guid) {
    browserHistory.push({ pathname: 'characters/load', query: { guid } });// Route is not set up on this page so <Links> and <a href> don't work with react-router
    currentCharacterGUID = guid;// This sets the GUID of the react element
  },

  handleSaveClick() { // Right now, only set this to true because we only can 'save' once
    hasBeenSaved = true;
  },

  // How to handle when a form is being updated in the character sheet
  handleChangingCharacterSheetElement(e) {
    const characterSheetGUID = document.getElementsByName('character-sheet-wrapper')[0].id; // Sets the ID stored in our react element to the element ID of our root div
    const newData = { [characterSheetGUID]: { characterData: { [e.target.id]: e.target.value } } }; // Sets the data in a format that matches with state and localstorage.state
    newData[characterSheetGUID].characterData = this.combineObjects(this.state[characterSheetGUID].characterData, newData[characterSheetGUID].characterData);// matches the properties in our master state with our new state
    this.setState(this.combineObjects(this.state, newData));// Updates react's state with a combined version of the original state and our new data
    if (hasBeenSaved) { // Only if a user has saved the first time does the condition pass
      this.syncState('reactState'); // Updates localStorage state by what reactState thinks is correct
    }
  },

  // The default character sheet with one field to set if it is passed a GUID to set into the character sheet wrapper ID
  defaultCharacterSheet(characterQuery) {
    return (
      <div name="character-sheet-wrapper" id={currentCharacterGUID}>
        <SaveAlert />
        <Grid
          style={{
            padding: '50px',
            width: '100%',
          }}
        >
          <h1>Create Character</h1>
          <div id="character-sheet-body" >
            {/* Name entry field and label*/}
            <CharacterSheetTextField labelName="Name" divID="name-field" placeHolder="Nedberth the Red" onChange={this.handleChangingCharacterSheetElement} />
            {/* Character background field and label*/}
            <CharacterSheetTextField labelName="Background" divID="background-field" placeHolder="Soldier" onChange={this.handleChangingCharacterSheetElement} />
            {/* Character personality traits field and label*/}
            <CharacterSheetTextField labelName="Personality Traits" divID="personality-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act." />
            {/* Character ideals field and label*/}
            <CharacterSheetTextField labelName="Ideals" divID="ideals-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="Respect. People deserve to be treated with dignity and courtesy." />
            {/* Character bonds field and label*/}
            <CharacterSheetTextField labelName="Bonds" divID="bonds-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members." />
            {/* Character flaws field and label*/}
            <CharacterSheetTextField labelName="Flaws" divID="flaws-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I secretly wonder weather the gods care about mortal affairs at all." />
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                      <Col componentClass={ControlLabel} md={2}>Init</Col>
                      <Col md={10}>
                        <FormControl
                          id="level-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder="0"
                          onChange={this.handleChangingCharacterSheetElement}
                        >
                          <option value="-4">-4</option>
                          <option value="-3">-3</option>
                          <option value="-2">-2</option>
                          <option value="-1">-1</option>
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                        </FormControl>
                      </Col>
                    </FormGroup>
                  </Form>
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          placeholder="0"
                          onChange={this.handleChangingCharacterSheetElement}
                        >
                          <option value="0">0</option>
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                  <CharacterSheetStatDropdown labelName="STR" divID="strength-dropdown" withModifier />
                  {/* Character dexterity and dexterity bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdown labelName="DEX" divID="dexterity-dropdown" withModifier />
                  {/* Character constitution and constitution bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdown labelName="CON" divID="constitution-dropdown" withModifier />
                  {/* Character intelligence and intelligence bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdown labelName="INT" divID="intelligence-dropdown" withModifier />
                  {/* Character wisdom and wisdom bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdown labelName="WIS" divID="wisdom-dropdown" withModifier />
                  {/* Character charisma and charisma bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdown labelName="CHA" divID="charisma-dropdown" withModifier />
                </Well>
              </Col>
              <Col md={4} />
              <Col md={2} />
            </Row>
            <Row className="character-sheet-row">
              <SaveButton onClick={this.handleSaveClick} />
            </Row>
          </div>
        </Grid>
      </div>

    );
  },

  renderContent() { // Right now this file handles all the subroutes for /characters
    if (subroute === 'new') { // If we are creating a new character
      return this.defaultCharacterSheet(); // Default character sheet with no GUID passed
    } else if (subroute === 'load') {
      return this.defaultCharacterSheet(this.props.location.query.guid); // Return a sheet filled with the GUID passed in a URL query string
    } else if (subroute === undefined) { // This subroute is accessed when we are displaying all our characters in a table
      /* This is the default route
      for /characters with no subroute. Just display all the characters here*/
      const characterRows = [];
      const allCharacters = localStorage.state === null ? {} : JSON.parse(localStorage.state); // Grab all the characters from localstorage

      if (localStorage.state !== undefined) { // Only want to display characters if localstroage contains some
        let characterData = {};
        // Render the characters only if there are actually some to render
        Object.keys(allCharacters).forEach((characterGUID, index) => { // Grabbing all the root properties which are set by a GUID named property
          characterData = allCharacters[characterGUID].characterData; // characterData is what we are concerned with for each of the character GUIDs
          characterRows.push( // Add the character data one at a time in the form of table rows filled with just a name and level but have a click method attached
            <tr key={allCharacters[index]} onClick={() => { this.handleTRClick(characterGUID); }}>
              <td >{characterData['name-field']}</td>
              <td>{characterData['level-dropdown']}</td>
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
    // If we have no idea what we are being directed do, this is the 404 return
    return (
      <p>bad url</p>
    );
  },
  
  render() { // Render function determined by what the subroute is
    subroute = this.props.params.subroute;
    return (this.renderContent());
  },
}));

module.exports = Character;

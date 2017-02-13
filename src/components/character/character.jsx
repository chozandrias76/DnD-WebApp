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
} = require('react-bootstrap');

const { browserHistory } = require('react-router');

const ReactCSSTransitionGroup = require('react-addons-css-transition-group'); // ES5 with npm
// const ReactTransitionGroup = require('react-addons-transition-group'); // ES5 with npm
const { Link } = require('react-router');

let currentCharacterGUID = '';
let subroute = '';
const Character = React.createClass(({
  getInitialState() { // Set in state that the save alert isn't drawing when the page loads
  if(this.state === null) {
    if(localStorage !== undefined && localStorage.state !== undefined){
      return JSON.parse(localStorage.state);
    } else {
      return {
        documentData: {
          showSaveAlert: false,
        }
      };
    }
  }
      return this.state;
  },
  componentWillMount() {
    let initialData = {};

    if (this.props.params.subroute === 'new') {
      // alert(this.props.params.subroute);
      initialData = document.getElementsByName('character-sheet-wrapper')[0] === undefined ?
     this.gUIDGenerator() : document.getElementsByName('character-sheet-wrapper')[0].id;
      currentCharacterGUID = initialData;
      const newState = {
        [initialData]: {
          characterData: {},
        },
      };
      this.setState(this.combineObjects(localStorage.state === undefined ? {} : JSON.parse(localStorage.state), newState));
      this.syncState('reactState');
      localStorage.state = JSON.stringify(this.state);
    } else if (this.props.params.subroute === 'load') {
      currentCharacterGUID = this.props.location.query.guid;
      this.syncState('localStorageState');
    }
  },
  componentDidMount() {
    if (this.props.params.subroute === 'load') {
      document.getElementsByName('character-sheet-wrapper')[0].id = currentCharacterGUID;
      const localStorageState = JSON.parse(localStorage.state);
      delete localStorageState.documentData;
      //this.setState(localStorageState[currentCharacterGUID].characterData);
      if (Object.prototype.hasOwnProperty.call(localStorageState, this.props.location.query.guid)) { // If there is a property that matches a GUID provided
        const stateFilledCharacterData = localStorageState[this.props.location.query.guid].characterData; // Set a copy of the character data in state
        Object.keys(stateFilledCharacterData).forEach((data, index) => { // For every property in the character data
          document.getElementById(this.propName(stateFilledCharacterData, stateFilledCharacterData[data].toString())).value = stateFilledCharacterData[data]; //
        });
      }
      console.log(this.state);
    }
  },
  componentDidUpdate() {
    if (this.props.params.subroute === 'load') {
      document.getElementsByName('character-sheet-wrapper')[0].id = currentCharacterGUID;
      const localStorageState = JSON.parse(localStorage.state);
      delete localStorageState.documentData;
      if (Object.prototype.hasOwnProperty.call(localStorageState, this.props.location.query.guid)) { // If there is a property that matches a GUID provided
        const stateFilledCharacterData = localStorageState[this.props.location.query.guid].characterData; // Set a copy of the character data in state
        // console.log(stateFilledCharacterData);
        Object.keys(stateFilledCharacterData).forEach((data) => { // For every property in the character data
          // console.log(this.propName(stateFilledCharacterData, stateFilledCharacterData[data]));
          document.getElementById(this.propName(stateFilledCharacterData, stateFilledCharacterData[data])).value = stateFilledCharacterData[data]; //
        });
      }
    }
    this.syncState('reactState');
  },
  propName(object, propertyValue) {
    let res = '';
    for (const i in object) {
      if (typeof object[i] === 'object') {
        if (this.propName(object[i], propertyValue)) {
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
      localStorage.state = JSON.stringify(this.combineObjects(localStorage.state === undefined ? {} : JSON.parse(localStorage.state), this.state));
    }
  },
  /* eslint-disable no-param-reassign*/
  combineObjects(obj, src) {
    // Object.keys(src).forEach((key) => { obj.assign(obj[key], src[key]); });
    Object.keys(src).forEach((key) => { obj[key] = src[key]; });
    return obj;
  },
  /* eslint-enable no-param-reassign*/
  toggleSaveAlert() {
    if (Object.prototype.hasOwnProperty.call(this.state.documentData, 'showSaveAlert')) {
      if (this.state.documentData.showSaveAlert) {
        this.setState({ documentData: {
          showSaveAlert: false,
        } });
      } else {
        this.setState({ documentData: {
          showSaveAlert: true,
        } });
        setTimeout(this.toggleSaveAlert(), 6000);
      }
    }
  },
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
  // How to handle when a form is being updated in the character sheet
  handleChangingCharacterSheetElement(e) {
    const characterSheetGUID = document.getElementsByName('character-sheet-wrapper')[0].id; // Sets the ID stored in our react element to the element ID of our root div
    const newData = { [characterSheetGUID]: { characterData: { [e.target.id]: e.target.value } } }; // Sets the data in a format that matches with state and localstorage.state
    //console.log(this.state)
    newData[characterSheetGUID].characterData = this.combineObjects(this.state[characterSheetGUID].characterData, newData[characterSheetGUID].characterData);// matches the properties in our master state with our new state
    this.setState(this.combineObjects(this.state, newData));// Updates react's state with a combined version of the original state and our new data
    this.syncState('reactState');// Updates localStorage state by what reactState thinks is correct
  },
  // The default character sheet with one field to set if it is passed a GUID to set into the character sheet wrapper ID
  defaultCharacterSheet(characterQuery) {
    // const saveAlert = Object.prototype.hasOwnProperty.call(this, 'state') ? (this.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '') :
    // (this.localStorage.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '');
    var saveAlert = '';
    if(Object.prototype.hasOwnProperty.call(this, 'state') && this.state !== null){
      if(Object.prototype.hasOwnProperty.call(this.state, 'documentData')){
        saveAlert = this.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '';
      }
    }
    else if(Object.prototype.hasOwnProperty.call(localStorage, 'state')  && localStorage.state !== null){
      if(Object.prototype.hasOwnProperty.call(localStorage.state, 'documentData')){
        saveAlert = localStorage.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '';
      }
    }
    if (characterQuery) currentCharacterGUID = characterQuery;
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
                    onChange={this.handleChangingCharacterSheetElement}
                  />
                </Form>
              </Col>
              <Col md={2} id="save-button-container">
                {/* A button for saving the character sheet*/}
                <Link
                  onClick={this.toggleSaveAlert}
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
                    onChange={this.handleChangingCharacterSheetElement}
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
                  onChange={this.handleChangingCharacterSheetElement}
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
                  onChange={this.handleChangingCharacterSheetElement}
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
                  onChange={this.handleChangingCharacterSheetElement}
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
                  onChange={this.handleChangingCharacterSheetElement}
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
                  <Form horizontal>
                    <FormGroup >
                      <Col componentClass={ControlLabel} md={2}>STR</Col>
                      <Col md={4}>
                        <FormControl
                          id="strength-dropdown"
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
                      <Col md={4}>
                        <FormControl
                          id="strength-modifier-dropdown"
                          className="character-sheet-field"
                          componentClass="select"
                          placeholder=""
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
                          onChange={this.handleChangingCharacterSheetElement}
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
  renderContent() { // Right now this file handles all the subroutes for /characters
    if (subroute === 'new') { // If we are creating a new character
      return this.defaultCharacterSheet(); // Default character sheet with no GUID passed
    } else if (subroute === 'load') {
      return this.defaultCharacterSheet(this.props.location.query.guid); // Return a sheet filled with the GUID passed in a URL query string
    } else if (subroute === undefined) { // This subroute is accessed when we are displaying all our characters in a table
      /* This is the default route
      for /characters with no subroute. Just display all the characters here*/
      const characterRows = [];
      const allCharacters = localStorage.state === undefined ? {} : JSON.parse(localStorage.state); // Grab all the characters from localstorage
      delete allCharacters.documentData; // Get rid of the document data because that is used for only effects on that page

      if (localStorage.state !== undefined) { // Only want to display characters if localstroage contains some
        let characterData = {};
        // Render the characters only if there are actually some to render
        Object.keys(allCharacters).forEach((characterGUID, index) => { // Grabbing all the root properties which are set by a GUID named property
          characterData = allCharacters[characterGUID].characterData; // characterData is what we are concerned with for each of the character GUIDs
          characterRows.push( // Add the character data one at a time in the form of table rows filled with just a name and level but have a click method attached
            <tr key={allCharacters[index]} onClick={() => { this.handleTRClick(characterGUID);}}>
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

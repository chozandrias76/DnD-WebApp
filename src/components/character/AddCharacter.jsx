const React = require('react');
const {
    Button,
    FormGroup,
    ControlLabel,
    FormControl,
    Form,
    Grid,
    Row,
    Col,
    Well,
    Alert,
} = require('react-bootstrap');
const { browserHistory } = require('react-router');

const CharacterComponent = require('./character.jsx');


const CharacterSheetTextFieldComponent = React.createClass({
  handleChangingCharacterSheetElement(e) {
    this.props.onChange(e);
  },
  render() {
    return (
      <Row className="character-sheet-row">
        <Col md={2}>
          <ControlLabel className="character-form-description">{this.props.labelName}</ControlLabel>
        </Col>
        <Col md={8}>
          <FormControl
            id={this.props.divID}
            className="character-sheet-field"
            type="text"
            placeholder={this.props.placeHolder}
            onChange={this.handleChangingCharacterSheetElement}
          />
        </Col>
      </Row>
    );
  },
});

const CharacterSheetStatDropdownComponent = React.createClass({
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
      <Row>
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
      </Row>
    );
  },
});

const SaveAlert = React.createClass({
  getInitialState() { // Set in state when the page loads
    return (
    {
      documentData: {
        showSaveAlert: true,
      },
    });
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
          <h4>You will only see this warning once</h4>
          <p>You need to click the save button every time you want to make changes</p>
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
    return (
    {
      documentData: {
        showSaveButton: true,
      },
    });
  },

  toggleSaveButton() { // Toggles on and off our save alert when the button is pressed.
    // if (Object.prototype.hasOwnProperty.call(this.state.documentData, 'showSaveButton')) {
    //   if (this.state.documentData.showSaveButton) {
    //     this.setState({ documentData: {
    //       showSaveButton: false,
    //     } });
    //   } else {
    //     this.setState({ documentData: {
    //       showSaveButton: true,
    //     } });
    //   }
    // }
  },
  handleSaveClick(){
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
    else console.log(this.props);
  },
  render() {
    return (// Route is not set up on this page so <Links> and <a href> don't work with react-router
      <Button bsStyle="primary" onClick={this.handleSaveClick} style={{ position: 'absolute', zIndex: 1 }}>Save</Button>
      );
  },

});

const AddCharacterComponent = React.createClass({
  getInitialState() { // Set in state when the page loads
    // if (this.state === null) { // If nothing is in state,
    //   if (localStorage !== undefined && localStorage.state !== undefined) { // And if localstorage contains state
    //     return JSON.parse(localStorage.state); // Make our state match localstorage
    //   }
    // }
    return this.state; // If we already have a state, we don't want to return anything different
  },

  componentWillMount() { // Called when a react component is about to mount
    let initialData = {};

    initialData = this.gUIDGenerator();

    const newState = {
      [initialData]: {
        characterData: {},
      },
    };
    this.setState(newState);
    //this.syncState('reactState');
  },

  componentDidMount() { // Is called after the react component did mount
    /*
    Right now the only thing that needs to happen after a character component is mounted is load in data from state
    to appear properly on the fields from the last time it was edited
    */
    // this.syncCharacterSheetValues();
  },

  componentDidUpdate() { // Is called after page updates in any way
    /*
    Right now the only thing that needs to happen after a character component is updated is load in data from state
    to appear properly on the fields from the last time it was edited
    */
    // this.syncCharacterSheetValues();
  },
  saveCharacterSheet(gUID) {
    this.syncCharacterSheetValues();
  },
  syncCharacterSheetValues() {
    // if (this.props.params.subroute === 'load') { // Only need to do things if we mounted the component after loading a character
    // document.getElementsByName('character-sheet-wrapper')[0].id = currentCharacterGUID; // Updates the page with the proper guid for the loaded sheet
    const localStorageState = JSON.parse(localStorage.state); // Make a copy of the local storage state since you can't directly edit it as an object only as a string
    if (Object.prototype.hasOwnProperty.call(localStorageState, this.props.location.query.guid)) { // If there is a property that matches a GUID provided
      const stateFilledCharacterData = localStorageState[this.props.location.query.guid].characterData; // Set a copy of the character data in state
      Object.keys(stateFilledCharacterData).forEach((data) => { // For every property in the character data
          // Set our fields in the character sheet to match the data stored in local storage for that character
        document.getElementById(this.reportPropName(stateFilledCharacterData, stateFilledCharacterData[data])).value = stateFilledCharacterData[data];
      });
    }
    // }
    // if (hasBeenSaved) { // Only if a user has saved the first time does the condition pass
    this.syncState('reactState'); // Updates localStorage state by what reactState thinks is correct
    // }
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
  handleSaveClick() {
    this.saveCharacterSheet();
  },
  handleChangingCharacterSheetElement(e) {
    console.log(this.state)
    const characterSheetGUID = document.getElementsByName('character-sheet-wrapper')[0].id; // Sets the ID stored in our react element to the element ID of our root div
    const newData = { [characterSheetGUID]: { characterData: { [e.target.id]: e.target.value } } }; // Sets the data in a format that matches with state and localstorage.state
    newData[characterSheetGUID].characterData = this.combineObjects(this.state[characterSheetGUID].characterData, newData[characterSheetGUID].characterData);// matches the properties in our master state with our new state
    this.setState(this.combineObjects(this.state, newData));// Updates react's state with a combined version of the original state and our new data
    // if (hasBeenSaved) { // Only if a user has saved the first time does the condition pass
    //   this.syncState('reactState'); // Updates localStorage state by what reactState thinks is correct
    // }
  },
  // The default character sheet with one field to set if it is passed a GUID to set into the character sheet wrapper ID
  defaultCharacterSheet() {
    return (
      <div name="character-sheet-wrapper" id="{currentCharacterGUID}">
        <SaveAlert />
        <Grid
          style={{
            padding: '50px',
            width: '100%',
          }}
        >
          <h1>Create Character</h1>
          <Form horizontal id="character-sheet-body" >
            {/* Name entry field and label*/}
            <CharacterSheetTextFieldComponent labelName="Name" divID="name-field" placeHolder="Nedberth the Red" onChange={this.handleChangingCharacterSheetElement} />
            {/* Character background field and label*/}
            <CharacterSheetTextFieldComponent labelName="Background" divID="background-field" placeHolder="Soldier" onChange={this.handleChangingCharacterSheetElement} />
            {/* Character personality traits field and label*/}
            <CharacterSheetTextFieldComponent labelName="Personality Traits" divID="personality-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act." />
            {/* Character ideals field and label*/}
            <CharacterSheetTextFieldComponent labelName="Ideals" divID="ideals-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="Respect. People deserve to be treated with dignity and courtesy." />
            {/* Character bonds field and label*/}
            <CharacterSheetTextFieldComponent labelName="Bonds" divID="bonds-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members." />
            {/* Character flaws field and label*/}
            <CharacterSheetTextFieldComponent labelName="Flaws" divID="flaws-field" onChange={this.handleChangingCharacterSheetElement} placeHolder="I secretly wonder weather the gods care about mortal affairs at all." />
            <Row className="character-sheet-row">
              <Col md={2} />
              <Col md={4}>
                {/* Character class dropdown and label*/}
                <FormGroup>
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
                  {/* Character alignment dropdown and label*/}
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
                  {/* Character level dropdown and label*/}
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
                  {/* Character exp field and label*/}
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
              </Col>
              <Col md={4}>
                <FormGroup>
                  {/* Character initiative field and label*/}
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
                  {/* Character speed field and label*/}
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
                  {/* Character max HP field and label*/}
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
                  {/* Character hitdice and dice type dropdown and label*/}
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
              </Col>
              <Col md={2} />
            </Row>
            {/* Character stats and stat bonus dropdowns and labels*/}
            <Row className="character-sheet-row">
              <Col md={2} />
              <Col md={4}>
                <FormGroup>
                  {/* Character strength and strength bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="STR" divID="strength-dropdown" withModifier />
                  {/* Character dexterity and dexterity bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="DEX" divID="dexterity-dropdown" withModifier />
                  {/* Character constitution and constitution bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="CON" divID="constitution-dropdown" withModifier />
                  {/* Character intelligence and intelligence bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="INT" divID="intelligence-dropdown" withModifier />
                  {/* Character wisdom and wisdom bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="WIS" divID="wisdom-dropdown" withModifier />
                  {/* Character charisma and charisma bonus dropdowns and labels*/}
                  <CharacterSheetStatDropdownComponent labelName="CHA" divID="charisma-dropdown" withModifier />
                </FormGroup>
              </Col>
              <Col md={4} />
              <Col md={2} />
            </Row>
            <Row className="character-sheet-row">
              <SaveButton onClick={this.handleSaveClick} />
            </Row>
          </Form>
        </Grid>
      </div>
    );
  },
  render() {
    return (this.defaultCharacterSheet());
  },
});

module.exports = AddCharacterComponent;

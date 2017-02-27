const React = require('react');
const {
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

const CharacterComponent = require('./character.jsx');


const CharacterSheetTextFieldComponent = React.createClass({
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
              onChange={CharacterComponent.handleChangingCharacterSheetElement}
            />
          </Form>
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
          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
              onChange={CharacterComponent.handleChangingCharacterSheetElement}
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

const AddCharacterComponent = React.createClass({
  defaultCharacterSheet() {
    let saveAlert = '';
    if (Object.prototype.hasOwnProperty.call(this, 'state') && this.state !== null) {
      if (Object.prototype.hasOwnProperty.call(this.state, 'documentData')) {
        saveAlert = this.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '';
      }
    } else if (Object.prototype.hasOwnProperty.call(localStorage, 'state') && localStorage.state !== null) {
      if (Object.prototype.hasOwnProperty.call(localStorage.state, 'documentData')) {
        saveAlert = localStorage.state.documentData.showSaveAlert ? <Alert bsStyle="warning" width="100px"><strong>Character Saved!</strong></Alert> : '';
      }
    }
    return (
      <div name="character-sheet-wrapper" id="placeholder-id">
        <Grid
          style={{
            padding: '50px',
            width: '100%',
          }}
        >
          <h1>Create Character</h1>
          <div id="character-sheet-body">
            {/* Name entry field and label*/}
            <CharacterSheetTextFieldComponent labelName="Name" divID="name-field" placeHolder="Nedberth the Red" />
            {/* Character background field and label*/}
            <CharacterSheetTextFieldComponent labelName="Background" divID="background-field" placeHolder="Soldier" />
            {/* Character personality traits field and label*/}
            <CharacterSheetTextFieldComponent labelName="Personality Traits" divID="personality-field" placeHolder="I'm always polite and respectful. Also, I don't trust my gut feelings so I tend to wait for others to act." />
            {/* Character ideals field and label*/}
            <CharacterSheetTextFieldComponent labelName="Ideals" divID="ideals-field" placeHolder="Respect. People deserve to be treated with dignity and courtesy." />
            {/* Character bonds field and label*/}
            <CharacterSheetTextFieldComponent labelName="Bonds" divID="bonds-field" placeHolder="I have three cousins - Gundred, Tharden and Nundro Rockseeker - who are my friends and cherished clan members." />
            {/* Character flaws field and label*/}
            <CharacterSheetTextFieldComponent labelName="Flaws" divID="flaws-field" placeHolder="I secretly wonder weather the gods care about mortal affairs at all." />
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
                          onChange={CharacterComponent.handleChangingCharacterSheetElement}
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
  render() {
    return (this.defaultCharacterSheet());
  },
});

module.exports = AddCharacterComponent;

const React = require('react');
const {
    Grid,
    Row,
    Col,
    Table,
    thead,
    tbody,
} = require('react-bootstrap');

const CharacterComponent = require('./character.jsx');


const CharacterListComponent = React.createClass({
  renderContent() {
  // This subroute is accessed when we are displaying all our characters in a table
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
          <tr key={allCharacters[index]} onClick={() => { CharacterComponent.handleTRClick(characterGUID); }}>
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
        <Grid className="character-grid">
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
  },
  render() {
    return (this.renderContent());
  },
});

module.exports = CharacterListComponent;

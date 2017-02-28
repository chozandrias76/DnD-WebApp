const React = require('react');
const AddCharacterComponent = require('./AddCharacter.jsx');


const EditCharacterComponent = React.createClass({
  getInitialState() { // Set in state when the page loads
    if (this.state === null) { // If nothing is in state,
      if (localStorage !== undefined && localStorage.state !== undefined) { // And if localstorage contains state
        return { [this.props.location.query.guid] : JSON.parse(localStorage.state)[this.props.location.query.guid] }; // Make our state match localstorage 
      }
    }
    
    return this.state; // If we already have a state, we don't want to return anything different
  },
  componentWillMount() { // Called when a react component is about to mount
    console.log(this.state);
    //AddCharacterComponent.syncCharacterSheetValues();
  },
  render() {
        console.log(AddCharacterComponent)

    return (<AddCharacterComponent />);
  },
});

module.exports = EditCharacterComponent;

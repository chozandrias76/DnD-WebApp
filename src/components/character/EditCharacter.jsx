const React = require('react');
const AddCharacterComponent = require('./AddCharacter.jsx');


const EditCharacterComponent = React.createClass({

  render() {
    return (<AddCharacterComponent />);
  },
});

module.exports = EditCharacterComponent;

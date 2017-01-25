import React from 'react';
import ReactDOM from 'react-dom';

import {} from 'react-bootstrap';
import {} from 'react-router';

class CreateCharacter extends React.Component {
    render() {
        alert(this.props.location.query);
        return (
        <div>
        <p>{this.props.location.query}</p>
        </div>
        );
    }
}

export default CreateCharacter;
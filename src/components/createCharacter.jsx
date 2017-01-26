var React = require('react');
var ReactDOM = require('react-dom');

var ReactBootstrap = require('react-bootstrap')
var ReactRouter = require('react-router')


var CreateCharacter = React.createClass(({
    render: function(){
         return (
        <div>
             Create that character, eh!
        </div>
        );
    }
}))

module.exports = CreateCharacter;

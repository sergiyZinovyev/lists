const React = require("react");

const styleObj = {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center'
};
  
function Header(props){ 
    return <div style={styleObj}>{props.text}</div>;
}
  
module.exports = Header;
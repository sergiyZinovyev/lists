const React = require("react");
const { IconButton } = require('@mui/material');
const { Checkbox  } = require('@mui/material');
const HighlightOffIcon = require('@mui/icons-material/HighlightOff').default;

const styleList = {
    margin: '20px'
};

const styleLi = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    gap: '11px',
    borderBottom: '2px solid black',
};

const styleCheckbox = {
    color:'#1976D2', 
    width: '20px',
    height: '20px',
};

const styleText = {
    color:'#1976D2', 
    cursor: 'pointer',
    fontSize: '24px'
};

function ListItems(props) {

    function remove(index) {
        props.onRemoveItem(index);
    }

    function update(index) {
        props.onUpdateList(index);
    }

    const items = props.list.map((item, index) => (
        <div style={styleLi} key={index}>
            <Checkbox 
                style={styleCheckbox}
                type="checkbox"
                checked={item.complete}
                onChange={() => update(index)}
            />
            <span 
                style={{ ...styleText, textDecoration: item.complete ? 'line-through' : 'none' }}
                onClick={() => update(index)}
            >{item.name}</span>
            <IconButton aria-label="delete" color='error' onClick={(event) => { event.stopPropagation(); remove(index); }} style={{ marginLeft: 'auto' }}>
                <HighlightOffIcon />
            </IconButton>
        </div>
    ));

    return <div style={styleList}>{items}</div>;
}
  
module.exports = ListItems;
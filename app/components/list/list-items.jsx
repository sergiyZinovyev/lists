const React = require("react");
const { IconButton } = require('@mui/material');
const { Checkbox  } = require('@mui/material');
const { Slide } = require('@mui/material');
const HighlightOffIcon = require('@mui/icons-material/HighlightOff').default;
const { useTheme } = require('@mui/material/styles');
const { useTheme: useCustomTheme } = require('../../theme-context.jsx');

const styleList = {
    margin: '20px'
};

const styleLi = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    gap: '11px',
    borderBottom: '1px solid black',
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
    const theme = useTheme();
    const { getColor } = useCustomTheme();

    function remove(index) {
        props.onRemoveItem(index);
    }

    function update(index) {
        props.onUpdateList(index);
    }

    const items = props.list.map((item, index) => (
        <Slide 
            key={index}
            direction="up" 
            in={true}
            timeout={100 + index*100}
            easing={{
                enter: theme.transitions.easing.sharp,
                exit: theme.transitions.easing.easeOut,
            }}
        >
            <div 
                style={{
                    ...styleLi,
                    borderColor: getColor('listborder')
                }}
            >
                <Checkbox 
                    style={{
                        ...styleCheckbox,
                        color: getColor('listtext')
                    }}
                    type="checkbox"
                    checked={item.complete}
                    onChange={() => update(index)}
                />
                <span 
                    style={{ 
                        ...styleText, 
                        color: getColor('listtext'),
                        textDecoration: item.complete ? 'line-through' : 'none' 
                    }}
                    onClick={() => update(index)}
                >{item.name}</span>
                <IconButton aria-label="delete" color='error' onClick={(event) => { event.stopPropagation(); remove(index); }} style={{ marginLeft: 'auto' }}>
                    <HighlightOffIcon />
                </IconButton>
            </div>
        </Slide>
    ));

    return <div style={styleList}>{items}</div>;
}
  
module.exports = ListItems;
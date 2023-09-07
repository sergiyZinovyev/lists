const React = require("react");
const { IconButton } = require('@mui/material');
const { Checkbox  } = require('@mui/material');
const { Slide } = require('@mui/material');
const HighlightOffIcon = require('@mui/icons-material/HighlightOff').default;
const { useTheme } = require('@mui/material/styles');
const { useTheme: useCustomTheme } = require('../../theme-context.jsx');

const styleList = {
    margin: '20px',
    position: 'relative',
    zIndex: 1,
    minHeight: 'calc(100vh - 150px)',
    overflow: 'hidden'
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

    const animationTime = 700;
    const animationCoef = 0.1;
    const animationDelay = animationTime * animationCoef;

    const [newItems, setNewItems] = React.useState([]);

    React.useEffect(() => {   
        let time = 0;
        if(newItems.length === 0) {
            props.list.forEach((el, index) => {
                time = index * animationDelay;
                setTimeout(() => {
                    setItem(el);
                }, time);
            })
        } else if(props.list.length > newItems.length) {
            setItem(props.list[props.list.length - 1]);
        } else if(props.list.length < newItems.length) {}
        
    }, [props.list]);

    function setItem(el) {
        setNewItems(prevItems => {
            const nextItems = [...prevItems, el];
            return nextItems;
        });
    }

    function remove(index) {
        props.onRemoveItem(index);
        setNewItems(prevItems => {
            const newList = prevItems.filter((el, i) => el.id !== index);
            return newList;
        });
    }

    function update(index) {
        props.onUpdateList(index);
    }

    const items = newItems.map((item, index, arr) => (    
        <Slide 
            key={index}
            direction="up" 
            in={true}
            mountOnEnter
            timeout={animationTime - index*(animationTime/arr.length)*animationCoef}
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
                    onChange={() => update(item.id)}
                />
                <span 
                    style={{ 
                        ...styleText, 
                        color: getColor('listtext'),
                        textDecoration: item.complete ? 'line-through' : 'none' 
                    }}
                    onClick={() => update(item.id)}
                >{item.name}</span>
                <IconButton 
                    aria-label="delete" 
                    color='error' 
                    onClick={(event) => { 
                        event.stopPropagation(); 
                        remove(item.id); 
                    }} 
                    style={{ marginLeft: 'auto' }}
                >
                    <HighlightOffIcon />
                </IconButton>
            </div>
        </Slide>
    ));

    return <div style={styleList}>{items}</div>;
}
  
module.exports = ListItems;
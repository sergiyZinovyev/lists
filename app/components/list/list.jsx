const React = require("react");
const { Box, LinearProgress, IconButton, Zoom } = require('@mui/material');
const ListItems = require("./list-items.jsx");
const AddCircleIcon = require('@mui/icons-material/AddCircle').default;
const { useTheme } = require('../../theme-context.jsx');

const styleBox = {
    marginTop: '10px',
};

const styleInput = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '60px',
    marginLeft: '20px',
    marginRight: '20px'
};

const styleInputElement = {
    flex: '1',
    backgroundColor: '#04192C',
    color: 'white',
    border: '2px solid #1976D2',
    borderRadius: '4px',
    paddingLeft: '8px',
    height: '30px',
    fontSize: '1rem'
};

function List() {

    const { getColor } = useTheme();

    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastSegment = urlParts[urlParts.length - 1];

    const [list, setList] = React.useState([]);

    const [newItem, setNewItem] = React.useState("");

    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => { 
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem(lastSegment));
            if (data !== null) {
                setList(data);
            }
            setLoading(false);
        }, 1000);
    }, []);
    

    function handleInputChange (event) {
        setNewItem(event.target.value);
    };

    function handleAddItem () {
        if (newItem.trim() !== "") {
            setList([...list, {name: newItem, complete: false}]);
            localStorage.setItem(lastSegment, JSON.stringify([...list, {name: newItem, complete: false}]));
            setNewItem("");
        }
    };

    function handleRemoveItem (index) {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
        localStorage.setItem(lastSegment, JSON.stringify(newList));
    };

    function updateList(index) {
        const updatedList = [...list];
        updatedList[index].complete = !updatedList[index].complete;
        setList(updatedList);
        localStorage.setItem(lastSegment, JSON.stringify(updatedList));
    }

    return (
        <div>
            <Zoom in={true} timeout={500}>
                <div style={styleInput}>
                    <input
                        type="text"
                        value={newItem}
                        style={{
                            ...styleInputElement,
                            backgroundColor: getColor('background'),
                            color: getColor('text'),
                            borderColor: getColor('listtext')
                        }}
                        onChange={handleInputChange}
                        placeholder="Add new list element"
                    />
                    <IconButton aria-label="add" style={{color: getColor('listtext')}} onClick={handleAddItem}>
                        <AddCircleIcon />
                    </IconButton>
                </div>
            </Zoom>
            {loading ? (
                <Box style={styleBox} sx={{ width: '100%' }}>
                    <LinearProgress color={getColor('muiTheme')} />
                </Box>
            ) : (
                <ListItems list={list} onRemoveItem={handleRemoveItem} onUpdateList={updateList}/>
            )}
        </div>
    );
};

module.exports = List;

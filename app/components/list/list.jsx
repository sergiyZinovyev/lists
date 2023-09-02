const React = require("react");
const { Button, Box, LinearProgress } = require('@mui/material');
const ListItems = require("./list-items.jsx");

const styleBtn = {
    marginLeft: '10px',
    fontWeight: 'bold'
};

const styleBox = {
    marginTop: '10px',
};

const styleInput = {
    marginTop: '20px',
    marginLeft: '20px',
};

function List() {

    const currentURL = window.location.href;
    const urlParts = currentURL.split('/');
    const lastSegment = urlParts[urlParts.length - 1];

    console.log('Последний элемент из URL:', lastSegment);

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
            <input
                type="text"
                value={newItem}
                style={styleInput}
                onChange={handleInputChange}
                placeholder="Add new element"
            />
            <Button variant="contained" style={styleBtn} onClick={handleAddItem}>Add</Button>
            {loading ? (
                <Box style={styleBox} sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            ) : (
                <ListItems list={list} onRemoveItem={handleRemoveItem} onUpdateList={updateList}/>
            )}
        </div>
    );
};

module.exports = List;

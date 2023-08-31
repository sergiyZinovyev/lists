const ReactDOM = require("react-dom/client");
const React = require("react");
const { Button, Box, LinearProgress } = require('@mui/material');
const Header = require("./components/header.jsx");
const List = require("./components/list.jsx");

const styleBtn = {
    marginLeft: '10px',
    fontWeight: 'bold'
};

const styleBox = {
    marginTop: '10px',
};

const styleInput = {
    marginLeft: '20px',
};

const App = () => {
    // const [list, setList] = React.useState([
    //     'Apple iPhone 12 Pro',
    //     'Samsung Galaxy S20',
    //     'Huawei P40 Pro',
    //     'Google Pixel 5',
    //     'Samsung Node20 ultra'
    // ]);

    const [list, setList] = React.useState([]);

    const [newItem, setNewItem] = React.useState("");

    const [loading, setLoading] = React.useState(true);

    const listName = "Smartphone list";

    React.useEffect(() => { 
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem(listName));
            if(data!==null) {
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
            localStorage.setItem(listName, JSON.stringify([...list, {name: newItem, complete: false}]));
            setNewItem("");
        }
    };

    function handleRemoveItem (index) {
        const newList = list.filter((_, i) => i !== index);
        setList(newList);
        localStorage.setItem(listName, JSON.stringify(newList));
    };

    function updateList(index) {
        const updatedList = [...list];
        updatedList[index].complete = !updatedList[index].complete;
        setList(updatedList);
        localStorage.setItem(listName, JSON.stringify(updatedList));
    }

    return (
        <div>
            <Header text={listName} />
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
                <List list={list} onRemoveItem={handleRemoveItem} onUpdateList={updateList}/>
            )}
        </div>
    );
};

ReactDOM.createRoot(
    document.getElementById("app")
)
.render(<App />);

const React = require("react");
const Button = require('@mui/material/Button').default;
const TextField = require('@mui/material/TextField').default;
const Dialog = require('@mui/material/Dialog').default;
const DialogActions = require('@mui/material/DialogActions').default;
const DialogContent = require('@mui/material/DialogContent').default;
const DialogTitle = require('@mui/material/DialogTitle').default;
const Autocomplete = require('@mui/material/Autocomplete').default;

const styleDialog = {
    backgroundColor: '#112D45',
    color: 'white'
};

const top100Films = [
    'grocery',
    'The Godfather',
]

function ListDialog(props){
    const [name, setName] = React.useState('');
    const [describe, setDescribe] = React.useState('');
    const [type, setType] = React.useState('grocery');

    const handleClose = () => {
        props.onClose()
    };

    const add = () => {
        const data = {
            id: Date.now(),
            type: type,
            name: name,
            describe: describe
        }
        props.onAdd(data)
    };

    return (
        <Dialog open={props.open} onClose={handleClose} PaperProps={{ style: styleDialog }}>
            <DialogTitle>Add new list</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="List name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    InputProps={{
                        style: { color: 'white' },
                    }}
                />
                <TextField
                    margin="dense"
                    id="describe"
                    label="List describe"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={describe}
                    onChange={(e) => setDescribe(e.target.value)}
                    InputProps={{
                        style: { color: 'white' },
                    }}
                />
                {/* <TextField
                    margin="dense"
                    id="type"
                    label="List type"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    InputProps={{
                        style: { color: 'white' },
                    }}
                /> */}
                {/* <Autocomplete
                    disablePortal
                    id="combo-box"
                    options={top100Films}
                    defaultValue={type}
                    renderInput={(params) => <TextField 
                        {...params} 
                        margin="dense"
                        label="List type" 
                        variant="standard"
                        onChange={(e) => setType(e.target.value)}
                    />}
                /> */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={add}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

module.exports = ListDialog;
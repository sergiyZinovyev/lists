const React = require("react");
const Button = require('@mui/material/Button').default;
const TextField = require('@mui/material/TextField').default;
const Dialog = require('@mui/material/Dialog').default;
const DialogActions = require('@mui/material/DialogActions').default;
const DialogContent = require('@mui/material/DialogContent').default;
const DialogTitle = require('@mui/material/DialogTitle').default;
const InputLabel = require('@mui/material/InputLabel').default;
const MenuItem = require('@mui/material/MenuItem').default;
const FormControl = require('@mui/material/FormControl').default;
const Select = require('@mui/material/Select').default;
const { styled } = require('@mui/material');

const styleDialog = {
    backgroundColor: '#112D45',
    color: 'white'
};
  
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    color: 'white',
    '&.Mui-selected': {
        backgroundColor: '#112D45',
        color: 'white',
    },
}));

const listType = [
    {
        id: 1,
        name: 'grocery',
    },
    {
        id: 2,
        name: 'clothes',
    },
    {
        id: 3,
        name: 'technique',
    },
    {
        id: 4,
        name: 'others',
    },
    {
        id: 5,
        name: 'tasks',
    },
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
                <FormControl 
                    fullWidth 
                    variant="standard" 
                    margin="dense" 
                >
                    <InputLabel 
                        id="demo-simple-select-label"
                    >
                        List type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                        style={{
                            color: 'white'
                        }}
                        MenuProps={{
                            PaperProps: {
                              style: {
                                backgroundColor: 'black',
                                color: 'white',
                              },
                            },
                        }}
                    >
                        {listType.map((item) => (
                            <StyledMenuItem 
                                key={item.id} 
                                value={item.name}
                            >
                                {item.name}
                            </StyledMenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={add}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

module.exports = ListDialog;
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
const ListItemText = require('@mui/material/ListItemText').default;
const Select = require('@mui/material/Select').default;
const { useTheme } = require('../../theme-context.jsx');
const MaterialIcons = require('../icons/material-icons.jsx');

const styleDialog = {
    width: '85%',
    backgroundColor: '#112D45',
    color: 'white'
};

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
    
    const { getColor, switchTheme } = useTheme();

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
        <Dialog 
            open={props.open} 
            onClose={handleClose} 
            PaperProps={{ 
                style: {
                    ...styleDialog, 
                    backgroundColor: getColor('foreground'),
                    color: getColor('text')
                }
            }}
        >
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
                    color={getColor('muiTheme')}
                    InputProps={{
                        style: { color: getColor('text') },
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
                    color={getColor('muiTheme')}
                    InputProps={{
                        style: { color: getColor('text') },
                    }}
                />
                <FormControl 
                    fullWidth 
                    variant="standard" 
                    margin="dense"
                    color={getColor('muiTheme')} 
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
                            color: getColor('text'),
                        }}
                        MenuProps={{
                            PaperProps: {
                              style: {
                                backgroundColor: getColor('menuground') || 'black',
                                color: getColor('text') || 'white',
                              },
                            },
                        }}
                    >
                        {listType.map((item) => (
                            <MenuItem 
                                sx={{
                                    color: getColor('text') || 'white',
                                    '&.Mui-selected': {
                                        backgroundColor: getColor('selected') || '#112D45',
                                        color: getColor('text') || 'white',
                                    },
                                }}
                                key={item.id} 
                                value={item.name}
                            >
                                <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    color: getColor('text'),
                                }}>
                                    <MaterialIcons 
                                        size={24} 
                                        color={getColor('text')}
                                        data={item.name}
                                    />
                                    <ListItemText>{item.name}</ListItemText>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{color: getColor('listtext')}}>Cancel</Button>
                <Button onClick={add} style={{color: getColor('listtext')}}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

module.exports = ListDialog;
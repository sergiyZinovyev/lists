const React = require('react');
const MultiActionAreaCard = require('./multiaction-card.jsx');
const ListDialog = require('./list-dialog.jsx');
const { useNavigate } = require('react-router-dom');
const { 
    Box, 
    LinearProgress,
    styled,
    SpeedDial,
    Slide
} = require('@mui/material');

const { useTheme } = require('@mui/material/styles');
const { useTheme: useCustomTheme } = require('../../theme-context.jsx');
const SpeedDialIcon = require('@mui/material/SpeedDialIcon').default;
const AddCircleIcon = require('@mui/icons-material/AddCircle').default;
const SaveIcon = require('@mui/icons-material/Save').default;
const PrintIcon = require('@mui/icons-material/Print').default;
const ShareIcon = require('@mui/icons-material/Share').default;
const EditIcon = require('@mui/icons-material/Edit').default;



const StyleCard = styled('div')({
    flex: '1',
    maxWidth: '400px',
    minWidth: '300px',
    overflow: 'hidden',
    '@media (max-width: 450px)': {
        maxWidth: 'initial',
        minWidth: 'initial',
        width: '100%',
        flexBasis: '100%'
    },
});

const StyleCards = styled('div')({
    margin: '60px 20px',
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    '@media (max-width: 450px)': {
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const styleBox = {
    marginTop: '10px',
};

const styleNotFound = {
    marginTop: '100px',
    height: '100%',
    width: '100%',
    color: 'white',
    opacity: '0.1',
    fontSize: '50px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold'
};

const lists = [
    {
        id: 12345,
        type: 'grocery',
        name: 'Daily shopping list xxxx yyyyyy kkkkkkkkkkkkkkkkkkkkkx',
        describe: 'Grocery list for the week'
    },
    {
        id: 12346,
        type: 'grocery',
        name: 'Daily shopping list 2',
        describe: ''
    },
    {
        id: 12347,
        type: 'grocery',
        name: 'Daily shopping list 3',
        describe: 'Grocery list for the week'
    },
]

function Lists(){

    const { getColor } = useCustomTheme();

    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [cards, setCards] = React.useState([]);

    const navigate = useNavigate();
    const theme = useTheme();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => { 
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem('AllLists'));
            if (data !== null) {
                setCards(data);
            }
            setLoading(false);
        }, 500);
    }, []);

    const addList = (data) => {
        setOpen(false);
        console.log('data: ', data);
        const newCards = [data, ...cards];
        setCards(newCards);
        localStorage.setItem('AllLists', JSON.stringify(newCards));
        navigate(`/list/${encodeURIComponent(data.id)}`);
    };

    const removeList = (index) => {
        const removedKey = cards[index].id;
        const newLists = cards.filter((_, i) => i !== index);
        setCards(newLists);
        localStorage.setItem('AllLists', JSON.stringify(newLists));
        localStorage.removeItem(removedKey);
    };

    function items() {
        console.log('cards: ', cards);
        if (cards && cards.length > 0) {
            return cards.map((item, index) => (
                <Slide 
                    key={index}
                    direction="up" 
                    in={!loading}
                    timeout={350}
                    easing={{
                        enter: theme.transitions.easing.sharp,
                        exit: theme.transitions.easing.easeOut,
                    }}
                >
                    <StyleCard>
                        <MultiActionAreaCard card={item} onRemove={() => { removeList(index) }}/>
                    </StyleCard>
                </Slide>
            )) 
        } else {
            return (
                <div style={{
                    ...styleNotFound,
                    color: getColor('text')
                }}>
                    Click <AddCircleIcon style={{ fontSize: 55, verticalAlign: 'middle' }} /> below and create your first list
                </div>
            )
        }
        
    }

    return (
        <div>
            {loading ? (
                <Box style={styleBox} sx={{ width: '100%' }}>
                    <LinearProgress color={getColor('muiTheme')} />
                </Box>
            ) : (
                <StyleCards>{items()}</StyleCards>
            )}
            <Box 
                sx={{ 
                    transform: 'translateZ(0px)', 
                    flexGrow: 1,
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    zIndex: 999,
                }}>
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    sx={{ 
                        position: 'absolute', 
                        bottom: 16, 
                        right: 16,
                    }}
                    FabProps={{
                        sx: {
                          bgcolor: getColor('listtext'),
                          '&:hover': {
                            bgcolor: getColor('listtext'),
                          }
                        }
                    }}
                    icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    onClick={handleClickOpen}
                >
                </SpeedDial>
            </Box>
            <ListDialog open={open} onClose={handleClose} onAdd={(data) => { addList(data) }} />
        </div>
    );

}

module.exports = Lists;

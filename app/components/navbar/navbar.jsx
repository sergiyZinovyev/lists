const React = require("react");
const { IconButton } = require('@mui/material');
const HomeIcon = require('@mui/icons-material/Home').default;
const MoreVertIcon = require('@mui/icons-material/MoreVert').default;
const { 
    Menu, 
    MenuItem,
} = require('@mui/material');
const { Link, useLocation } = require('react-router-dom');

const { useTheme } = require('../../theme-context.jsx');

const styleNavbar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '2.7rem',
    backgroundColor: '#07243d',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
    padding: '10px',
    position: 'fixed',
    top: '0',
    zIndex: '1000',
    boxSizing: 'border-box',
};

const styleCenter = {
    flex: 1,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
    textAlign: 'center',
};

const styleCenterText = {
    display: 'inline-block',
    maxWidth: '100%',
    verticalAlign: 'middle',
};

const styleNavbarBottom = {
    marginBottom: '2.7rem'
};

const styleHome = {
    color: 'white',
};

function Navbar(props) { 
    const { getColor, switchTheme } = useTheme();

    const location = useLocation();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDarkTheme = () => {
        setAnchorEl(null);
        switchTheme('dark');
    };

    const handleLightTheme = () => {
        setAnchorEl(null);
        switchTheme('light');
    };

    const handlePurpleTheme = () => {
        setAnchorEl(null);
        switchTheme('dark purple');
    };

    const handleContrastTheme = () => {
        setAnchorEl(null);
        switchTheme('high contrast');
    };

    const [listName, setListName] = React.useState('');

    React.useEffect(() => { 
        const currentURL = location.pathname;
        const urlParts = currentURL.split('/');
        const lastSegment = urlParts[urlParts.length - 1];

        const data = JSON.parse(localStorage.getItem('AllLists'));
        const listName = data?.find(el => el.id === Number(lastSegment))?.name;
        if (listName) {
            setListName(listName);
        } else setListName('');
    }, [location.pathname]);

    return (
        <div>
            <div style={{...styleNavbar, backgroundColor: getColor('foreground')}}>
                <IconButton 
                    style={{...styleHome, color: getColor('text')}}
                    component={Link} to="/lists"
                >
                    <HomeIcon />
                </IconButton>
                <div style={styleCenter}>
                    <span style={{...styleCenterText, color: getColor('text')}}>
                        {listName}
                    </span>
                </div>
                <IconButton 
                    style={{...styleHome, color: getColor('text')}}
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{ style: {
                        backgroundColor: getColor('menuground'),
                        color: getColor('text'),
                      } }}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleDarkTheme}>Dark</MenuItem>
                    <MenuItem onClick={handlePurpleTheme}>Dark Purple</MenuItem>
                    <MenuItem onClick={handleLightTheme}>Light</MenuItem>
                    <MenuItem onClick={handleContrastTheme}>High Contrast</MenuItem>
                </Menu>
            </div>
            <div style={styleNavbarBottom}></div>
        </div>
    );
}

module.exports = Navbar;
const React = require("react");
const { IconButton } = require('@mui/material');
const HomeIcon = require('@mui/icons-material/Home').default;
const MoreVertIcon = require('@mui/icons-material/MoreVert').default;
const { Link, useLocation } = require('react-router-dom');

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
    const location = useLocation();

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
            <div style={styleNavbar}>
                <IconButton style={styleHome} component={Link} to="/lists">
                    <HomeIcon />
                </IconButton>
                <div style={styleCenter}>
                    <span style={styleCenterText}>
                        {listName}
                    </span>
                </div>
                <IconButton style={styleHome} component={Link} to="/lists">
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div style={styleNavbarBottom}></div>
        </div>
    );
}

module.exports = Navbar;
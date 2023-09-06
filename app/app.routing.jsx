const React = require("react");
const { useEffect } = require('react');

const { BrowserRouter: Router, Route, Routes, HashRouter } = require('react-router-dom');

const { useTheme } = require('./theme-context.jsx');

const List = require("./components/list/list.jsx");
const Lists = require("./components/lists/lists.jsx");
const Navbar = require("./components/navbar/navbar.jsx");

function Routing() { 
    const { theme, getColor } = useTheme();

    useEffect(() => {
        const htmlElement = document.querySelector('html');
        htmlElement.style.backgroundColor = getColor('background');
    }, [theme]);

    return (
        <HashRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Lists />} />
                <Route path="/list/:id" element={<List />} />
                <Route path="/lists" element={<Lists />} />
                <Route path="*" element={(<h2>Not found</h2>)} />
            </Routes>
        </HashRouter>
    )
}

module.exports = Routing;
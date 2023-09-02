const React = require("react");
const { BrowserRouter: Router, Route, Routes } = require('react-router-dom');
const List = require("./components/list/list.jsx");
const Lists = require("./components/lists/lists.jsx");
const Navbar = require("./components/navbar/navbar.jsx");

function Routing() { 

    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Lists />} />
                    <Route path="/list/:id" element={<List />} />
                    <Route path="/lists" element={<Lists />} />
                    <Route path="*" element={(<h2>Not found</h2>)} />
                </Routes>
            </div>
        </Router>
    )
}

module.exports = Routing;
const ReactDOM = require("react-dom/client");
const React = require("react");
const Routing = require("./app.routing.jsx");
const Navbar = require("./components/navbar/navbar.jsx");

ReactDOM.createRoot(
    document.getElementById("app")
).render(
    <Routing />
);

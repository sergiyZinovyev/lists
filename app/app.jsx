const ReactDOM = require("react-dom/client");
const React = require("react");
const Routing = require("./app.routing.jsx");
const { ThemeProvider } = require('./theme-context.jsx');

ReactDOM.createRoot(
    document.getElementById("app")
).render(
    <ThemeProvider>
        <Routing />
    </ThemeProvider>
);

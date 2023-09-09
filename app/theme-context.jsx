const React = require('react');
const { createContext, useState, useContext } = require('react');

const dark = {
  background: '#04192C',
  foreground: '#07243D',
  menuground: '#0c3f68',
  selected: '#205887',
  text: '#FFFFFF',
  listtext: '#1976D2',
  listborder: '#FFFFFF42',
  muiTheme: 'primary'
};

const light = {
  background: '#edf6ff',
  foreground: '#a5c8e5',
  menuground: '#c9dff2',
  selected: '#b4d2ef',
  text: '#000000B3',
  listtext: '#1976D2',
  listborder: '#00000038',
  muiTheme: 'primary'
};

const darkPurple = {
  background: '#070005',
  foreground: '#310633',
  menuground: '#680c63',
  selected: '#872087',
  text: '#FFFFFF',
  listtext: '#d219d2',
  listborder: '#FFFFFF42',
  muiTheme: 'secondary'
};

const highContrast = {
  background: '#f3f9ff',
  foreground: '#cfe6fa',
  menuground: '#e0f0fd',
  selected: '#b4d2ef',
  text: '#000000',
  listtext: '#000000',
  listborder: '#00000038',
  muiTheme: 'primary'
};

const themeMappings = {
  'dark': {
    name: 'dark',
    pathName: 'dark',
    cssData: dark
  },
  'light': {
    name: 'light',
    pathName: 'light',
    cssData: light
  },
  'dark purple': {
    name: 'dark purple',
    pathName: 'dark-purple',
    cssData: darkPurple
  },
  'high contrast': {
    name: 'high contrast',
    pathName: 'high-contrast',
    cssData: highContrast
  },
};

const ThemeContext = createContext();

function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themeMappings['dark']);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => { 
    const data = localStorage.getItem('theme');
      if (data !== null && themeMappings[data]) {
        setTheme(themeMappings[data]);
      }
    setLoading(false);
  }, []);

  function switchTheme(t) {
    const newTheme = themeMappings[t] || dark;
    localStorage.setItem('theme', t);
    setTheme(newTheme);
  }

  function getColor(colorName) {
    return theme.cssData[colorName]
  }

  return (
    loading ? null : (<ThemeContext.Provider value={{ theme, switchTheme, getColor }}>
      {children}
    </ThemeContext.Provider>)
  );
}

module.exports = { useTheme, ThemeProvider, themeMappings };

const React = require("react");

const svgMappings = {
    'grocery': '<path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-1.45-5c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6z"/>',
    'clothes': '<g><rect fill="none" height="24" width="24"/><path d="M21.6,18.2L13,11.75v-0.91c1.65-0.49,2.8-2.17,2.43-4.05c-0.26-1.31-1.3-2.4-2.61-2.7C10.54,3.57,8.5,5.3,8.5,7.5h2 C10.5,6.67,11.17,6,12,6s1.5,0.67,1.5,1.5c0,0.84-0.69,1.52-1.53,1.5C11.43,8.99,11,9.45,11,9.99v1.76L2.4,18.2 C1.63,18.78,2.04,20,3,20h9h9C21.96,20,22.37,18.78,21.6,18.2z M6,18l6-4.5l6,4.5H6z"/></g>',
    'technique': '<g><g><path d="M18,6V4h2V2H6C4.9,2,4,2.9,4,4v16c0,1.1,0.9,2,2,2h14v-2h-4.03C17.2,19.09,18,17.64,18,16v-5H8v5c0,1.64,0.81,3.09,2.03,4 H6V4h2v2c0,0.55,0.45,1,1,1h8C17.55,7,18,6.55,18,6z M10,16v-3h6v3c0,1.65-1.35,3-3,3S10,17.65,10,16z"/><circle cx="13" cy="9" r="1"/></g></g>',
    'others': '<g><rect fill="none" height="24" width="24"/><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/></g>',
    'tasks': '<g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M14,2H6C4.9,2,4.01,2.9,4.01,4L4,20c0,1.1,0.89,2,1.99,2H18c1.1,0,2-0.9,2-2V8L14,2z M18,20H6V4h7v5h5V20z M8.82,13.05 L7.4,14.46L10.94,18l5.66-5.66l-1.41-1.41l-4.24,4.24L8.82,13.05z"/></g></svg>',
    'default': '<path d="M21 20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20zm-2-1V9.978l-7-5.444-7 5.444V19h14z"/>',
};

// function getData(name) {
//     return dataMappings[name] || dataMappings['default'];
// }

function MaterialIcons({
    size = 18, // or any default size of your choice
    color = "black", // or any color of your choice
    data = "default"
  }) {

    //const pathData = getData(data);
    const svgHtml = { __html: svgMappings[data] || svgMappings['default'] };
    
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width={size} // added size here
        height={size} // added size here
        fill={color} // added color here
      >
        <path fill="none" d="M0 0h24v24H0z"/>
        <g dangerouslySetInnerHTML={svgHtml}></g>
        {/* <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-1.45-5c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.94-2H1v2h2l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2h7.45zM6.16 6h12.15l-2.76 5H8.53L6.16 6z"/> */}
        {/* <path d={getData(data)}/> */}
      </svg>
    )
  }

module.exports = MaterialIcons;
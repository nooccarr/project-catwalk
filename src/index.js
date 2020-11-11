import React from 'react';
import ReactDOM from 'react-dom';

const title = 'This title was passed via props: React with Webpack and Babel ****';

ReactDOM.render(
    <div>{title}</div>,
    document.getElementById('app')
);
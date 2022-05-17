import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment';

// Loading one-time preferences.
moment.updateLocale('en', { week: { dow: 1 } });

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        {/* <Global /> */}
        <App />
    </React.StrictMode>,
);


const Global = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
}
`;
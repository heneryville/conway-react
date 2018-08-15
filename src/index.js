import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import Favicon from './components/favicon/Favicon';
import './index.css';
import * as messageBus from './services/message-bus.js';


ReactDOM.render(
  <Favicon />,
  document.getElementById('favicon-shadow')
);

messageBus.subscribe(render);

function render() {

  ReactDOM.render(
    <App onIterate={render} />,
    document.getElementById('root')
  );

}

render();


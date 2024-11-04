import { createRoot } from 'react-dom/client';
import { Index } from './app';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <Router>
      <Index />
    </Router>
  </Provider>
);

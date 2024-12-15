import { createRoot } from 'react-dom/client';
import { Index } from './app';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router } from 'react-router-dom';
import { AppHeader } from './components/app-header/app-header';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
  <Provider store={store}>
    <Router>
      <AppHeader />
      <Index />
    </Router>
  </Provider>
);

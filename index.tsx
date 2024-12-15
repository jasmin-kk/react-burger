import { createRoot } from 'react-dom/client';
import { Index } from './src/app';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppHeader } from './src/components/app-header/app-header';

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

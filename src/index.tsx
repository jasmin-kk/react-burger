import { createRoot } from 'react-dom/client';
import { Index } from './app';
import React from 'react';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(<Index />);

import { ApolloProvider } from '@apollo/client';
import { createRoot } from 'react-dom/client';

import { client } from './lib/apollo';
import App from './App';

import './index.css'

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
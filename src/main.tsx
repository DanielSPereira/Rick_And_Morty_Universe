import App from './App'
import React from 'react'
import Modal from 'react-modal';
import ReactDOM from 'react-dom/client'
import './index.css'

Modal.setAppElement('#root');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

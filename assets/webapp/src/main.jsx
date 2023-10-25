import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Amplify, I18n } from 'aws-amplify'
import './index.css'

Amplify.configure({
  Auth: {
      region: import.meta.env.VITE_USER_POOL_REGION,
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolWebClientId: import.meta.env.VITE_USER_POOL_APP_CLIENT_ID
  }
});

console.log(import.meta.env.VITE_USER_APP_LOG_MESSAGE);

I18n.putVocabulariesForLanguage('en', {
  'Sign In': 'Login', // Tab header
  'Sign in': 'Login', // Button label
  'Create Account': 'Register', // Tab header
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)

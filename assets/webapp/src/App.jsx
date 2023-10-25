
import React from 'react';
import { AuthedContextProvider } from './context/AuthedContext'
import AllAuthedLayouts from './layout/AllAuthedLayouts'
import LoginHeader from './components/header/LoginHeader'
import { defaultDarkModeOverride, ThemeProvider, Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import './App.css'


function App() {

  const loginTheme = {
    name: "loginTheme",
    overrides: [defaultDarkModeOverride],
    tokens: {
      colors: {
        brand: {
          primary: {
            10: { value: "{colors.green.10}" },
            20: { value: "{colors.green.20}" },
            40: { value: "{colors.green.40}" },
            60: { value: "{colors.green.60}" },
            80: { value: "#42b01b" },
            90: { value: "#42b01b" },
            100: { value: "#42b01b" },
          },
        },
      },
      components: {
        button: {
          primary: {
            backgroundColor: { value: '#42b01b' },
            _hover: {
              backgroundColor: { value: '#42b01b' },
            },
            _focus: {
              backgroundColor: { value: '#42b01b' },
            },
            _active: {
              backgroundColor: { value: '#42b01b' },
            },
          },
        },
      },
    },
  };

  const components = {
    Header: LoginHeader,
  };

  return (
    <ThemeProvider theme={loginTheme} colorMode={'dark'}>
      <Authenticator components={components} loginMechanisms={['email']} >
        {({ signOut, user }) => (
            <AuthedContextProvider>
                <AllAuthedLayouts signOut={signOut} authedUser={user}/>
            </AuthedContextProvider>
        )}
      </Authenticator>
    </ThemeProvider>
  )
}

export default App

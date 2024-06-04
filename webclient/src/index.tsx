import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store, { persister } from 'store/store'
import ReactDOM from 'react-dom/client';
import App from './app/App';
// import reportWebVitals from './reportWebVitals';
import { AppRouter } from './router'
import { BigSinner } from 'components/index'
import { ThemeProvider } from '@mui/material';
import { theme } from 'theme/index'
import { Layout } from 'layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={<div>loading...</div>} persistor={persister}>
          <RouterProvider router={AppRouter} fallbackElement={<BigSinner />} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
);

// reportWebVitals();

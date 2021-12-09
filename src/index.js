import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter} from 'react-router-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {Web3ReactProvider} from '@web3-react/core';
import {ProviderLibrary} from '../src/config/web3/index';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <ChakraProvider>
        <Web3ReactProvider getLibrary={ProviderLibrary}>
          <App/>
        </Web3ReactProvider>
      </ChakraProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

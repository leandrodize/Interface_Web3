import Web3 from "web3";
import { InjectedConnector } from '@web3-react/injected-connector';

const connector = new InjectedConnector({ supportedChainIds: [4] }); //4 is the id of the Rinkeby testnet

const ProviderLibrary = (provider) => {
    return new Web3(provider);
}


export {connector, ProviderLibrary};


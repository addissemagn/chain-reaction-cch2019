import * as Ontology from 'ontology-dapi';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Dapp } from './dapp';
import { DappMap } from './dapp-map';
import { Home } from './home';
import { SmartContractAlert, SmartContractCertify, SmartContractVerify } from './smartContract';

const App: React.SFC<{}> = () => (
  <BrowserRouter>
    <>
      <Route path="/" exact={true} component={Dapp} />
      <Route path="/home" exact={true} component={Home} />
      <Route path="/smart-contract" exact={true} component={SmartContractCertify} />
      <Route path="/smart-contract" exact={true} component={SmartContractVerify} />
      <Route path="/smart-contract" exact={true} component={SmartContractAlert} />
      <Route path="/map" exact={true} component={DappMap} />
    </>
  </BrowserRouter>
);

Ontology.client.registerClient({});
ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

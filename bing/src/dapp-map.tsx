import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
import { RouterProps } from 'react-router';

export const DappMap: React.SFC<RouterProps> = (props) => {

  const contactAddress: string = 'b7b24896288e6f1f99f9ae49f54cfc170522f8ae';
// const publicKey: string = '02d8c6864b40cafe07157e7f741fb6107003ad8025a6eb6ba67517d54a8baddc13';

  async function ScVerify(values: any) {
    const scriptHash: string = contactAddress; // contract address
    const operation: string = 'VerifyPerson'; // function name
    const gasPrice: number = Number(500); // gas price
    const gasLimit: number = Number(100000); // gas limit
    const requireIdentity: boolean = false; // hard coded
    const parametersRaw: any[] = [{ type: 'String', value: 'cpr' }]; // function paramers

    const args = parametersRaw.map((raw) => ({ type: raw.type, value: convertValue(raw.value, raw.type) }));
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit,
        requireIdentity
      });
      // tslint:disable-next-line:no-console
      console.log('onScCall finished, result:' + JSON.stringify(result));
    } catch (e) {
      alert('onScCall canceled');
      // tslint:disable-next-line:no-console
      console.log('onScCall error:', e);
    }
  }

  function convertValue(value: string, type: ParameterType) {
    switch (type) {
      case 'Boolean':
        return Boolean(value);
      case 'Integer':
        return Number(value);
      case 'ByteArray':
        return value;
      case 'String':
        return client.api.utils.strToHex(value);
    }
  }

  function getIncidents() {
    alert('hello');
  }

  function unhidePatient() {
    const pati = document.querySelectorAll('.patient1');

    for (const e of pati) {
      e.classList.remove('hide');
    }
  }

  function maps() {
    window.location.replace('https://goo.gl/maps/PZR7meHiELmBY8j98');
  }

  function toClient() {
    unhidePatient();
    // props.history.push('/dapp');
    props.history.push('/');
  }

  return (
    <div className="emergencies">
      <div className="topnav">
        <a className="logo" href="#home">ChainReact</a>
        <div className="topnav-right">
          <div className="user">
            <div className="everything">
              <h2 className="toggle" onClick={toClient}>Report emergency</h2>
            </div>
          </div>
        </div>
      </div>
      <textarea onChange={getIncidents}></textarea>
      <div className="center client">
          <h2 className="larger-font">Nearby Emergencies</h2>
          <div className="client-options">
              <div id="pat1" className="go-to patient1" onClick={maps}>
                  <span>Cardiac arrest | 500m | 0 min ago </span>
                  <span>Accept</span>
              </div>
          </div>
      </div>
      <div className="details">
          <h3 className="myinfo">Your information </h3>
          <h3 className = "mydetails">Name: Addis Semagn </h3>
          <h3 className = "mydetails">ONT ID: AGinbPnYG5LinvZeS9gmwAEryw7VdaNPZB </h3>
          <h3 className = "mydetails">Certifications: Standard First Aid CPR/AED Level A </h3>
          <button className="add-info" onClick={ScVerify}>Verify credentials</button>
          <button className="add-info">Add credentials</button>
      </div>
    </div>
  );
};

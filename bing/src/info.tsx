import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
import { RouterProps } from 'react-router';

export const DappInfo: React.SFC<RouterProps> = (props) => {

  const contactAddress: string = 'b7b24896288e6f1f99f9ae49f54cfc170522f8ae';
  const publicKey: string = '02d8c6864b40cafe07157e7f741fb6107003ad8025a6eb6ba67517d54a8baddc13';

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

  async function ScAdd(values: any) {
    const scriptHash: string = contactAddress; // contract address
    const operation: string = 'CertifyPerson'; // function name
    const gasPrice: number = Number(500); // gas price
    const gasLimit: number = Number(100000); // gas limit
    const parametersRaw: any[] = [
        { type: 'ByteArray', value: publicKey },
        { type: 'String', value: 'cpr' }]; // function paramers

    const args = parametersRaw.map((raw) => ({ type: raw.type, value: convertValue(raw.value, raw.type) }));
    try {
      const result = await client.api.smartContract.invoke({
        scriptHash,
        operation,
        args,
        gasPrice,
        gasLimit
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

  function toClient() {
    unhidePatient();
    // props.history.push('/dapp');
    props.history.push('/');
  }

  function verifyMe() {
    ScVerify({}).then(toVerified);
  }

  function toVerified() {
    alert('This certificate is valid and belongs to the current ONT ID.');
  }

  function toInfo() {
    // props.history.push('/dapp');
    props.history.push('/info');
  }

  return (
    <div className="emergencies">
      <div className="topnav">
        <a className="logo" href="#home">ChainReact</a>
        <div className="topnav-right">
          <div className="user">
            <div className="everything">
              <span className="toggle" onClick={toClient}>Report emergency</span>
              <span className="toggle" onClick={toInfo}>My Info</span>
            </div>
          </div>
        </div>
      </div>
      <textarea onChange={getIncidents}></textarea>
      <div className="center client information-box">
            <h3 className="larger-font">Your information </h3>
            <div className="message mydetails">
                <h3 className = "mydetails"><strong>Name</strong> Addis Semagn </h3>
                <h3 className = "mydetails"><strong>ONT ID</strong> AGinbPnYG5LinvZeS9gmwAEryw7VdaNPZB </h3>
                <div className = "credentials">
                    <h3 className = "mydetails"><strong>Certifications</strong> Standard First Aid CPR/AED Level A</h3>
                    <button className="add-info" onClick={verifyMe}>Verify</button>
                </div>
            </div>

            {/* <div className="add-button"> */}
                <h2 className="" onClick={ScAdd}>+ Add credentials</h2>
            {/* </div> */}
      </div>
    </div>
  );
};

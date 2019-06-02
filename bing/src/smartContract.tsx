import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
// import {  } from 'react-final-form-arrays';
import { RouterProps } from 'react-router';

const contactAddress: string = 'b7b24896288e6f1f99f9ae49f54cfc170522f8ae';
const publicKey: string = '02d8c6864b40cafe07157e7f741fb6107003ad8025a6eb6ba67517d54a8baddc13';

// tslint:disable:max-line-length
export const SmartContractCertify: React.SFC<RouterProps> = (props) => {
  async function onScCall(values: any) {
    const scriptHash: string = contactAddress; // contract address
    const operation: string = 'CertifyPerson'; // function name
    const gasPrice: number = Number(500); // gas price
    const gasLimit: number = Number(100000); // gas limit
    const parametersRaw: any[] = [{ type: 'ByteArray', value: publicKey }, { type: 'String', value: 'cpr' }]; // function paramers

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

  return (
      <button className="lol" onClick={onScCall}>CertifyPerson</button>
  );
};

export const SmartContractVerify: React.SFC<RouterProps> = (props) => {
  async function onScCall(values: any) {
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

  return (
      <button onClick={onScCall}>VerifyPerson</button>
  );
};

export const SmartContractAlert: React.SFC<RouterProps> = (props) => {
  async function onScCall(values: any) {
    const scriptHash: string = contactAddress; // contract address
    const operation: string = 'ReportIncident'; // function name
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

  return (
      <button onClick={onScCall}>ReportIncident</button>
  );
};

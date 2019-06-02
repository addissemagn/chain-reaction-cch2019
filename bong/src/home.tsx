import * as React from 'react';
import { RouterProps } from 'react-router';

export const Home: React.SFC<RouterProps> = (props) => {
  function onSmartContract() {
    props.history.push('/smart-contract');
  }

  return (
    <div>
      <button onClick={onSmartContract}>Smart contract</button>
    </div>
  );
};

// import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
import { RouterProps } from 'react-router';

export const DappMap: React.SFC<RouterProps> = (props) => {
  function unhidePatient() {
    const pati = document.querySelectorAll('.patient1');

    for (const e of pati) {
      e.classList.remove('hide');
    }
  }

  function maps() {
    window.location.replace('https://goo.gl/maps/PZR7meHiELmBY8j98');
  }

  function callPerson() {
    window.location.replace('http://bit.ly/2Mo8S48');
  }

  function toClient() {
    unhidePatient();
    // props.history.push('/dapp');
    props.history.push('/');
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
      <div className="center client">
          <h2 className="larger-font">Nearby Emergencies</h2>
          <div className="client-options">
              <div id="pat1" className="go-to patient1 btn1" onClick={maps}>
                  <span>Cardiac arrest | 500m | 0 min ago </span>
                  <span>Go to</span>
              </div>
              <div className="go-to btn2">
                <h2 className="call" onClick={callPerson}>Call</h2>
              </div>
              <iframe id="goog-map"
              width="100%"
              height="325px"
              src={'https://www.google.com/maps/d/embed?mid=1KmjISOniMSeRjtw4AhrW2q-7jc6lTHrG&zoom=14&z=15'}></iframe>
          </div>
      </div>
    </div>
  );
};

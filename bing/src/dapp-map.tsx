// import { client, ParameterType } from 'ontology-dapi';
import * as React from 'react';
import { RouterProps } from 'react-router';

export const DappMap: React.SFC<RouterProps> = (props) => {
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
      <textarea onChange={getIncidents}></textarea>
      <div className="center client">
          <h2 className="larger-font">Nearby Emergencies</h2>
          <div className="client-options">
              <div id="pat1" className="go-to patient1 btn1" onClick={maps}>
                  <span>Cardiac arrest | 500m | 0 min ago </span>
                  <span>Accept</span>
              </div>
              <div className="go-to btn2">
                <h2 className="call" onClick={callPerson}>Call</h2>
              </div>
          </div>
      </div>
    </div>
  );
};

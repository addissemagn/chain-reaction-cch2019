import * as React from 'react';
import { RouterProps } from 'react-router';

export const DappMap: React.SFC<RouterProps> = (props) => {
  function getIncidents() {
    alert('hello');
  }

  function toClient() {
    props.history.push('/dapp');
  }

  return (
    <div>
      <div className="topnav">
        <a className="logo" href="#home">ChainReact</a>
        <div className="topnav-right">
          <div className="user">
            <div className="everything">
              <h2 className="toggle" onClick={toClient}>Record emergency</h2>
            </div>
          </div>
        </div>
      </div>
      <textarea onChange={getIncidents}></textarea>
      <div className="center client">
          <h2 className="larger-font">Nearby Emergencies</h2>
          <div className="client-options">
              <div className="go-to">
                  <span>Patient Type</span>
                  <span>Distance</span>
              </div>
              <div className="go-to">
                  <span>Patient Type</span>
                  <span>Distance</span>
              </div>
              <div className="go-to">
                  <span>Patient Type</span>
                  <span>Distance</span>
              </div>
              <div className="go-to">
                  <span>Patient Type</span>
                  <span>Distance</span>
              </div>
          </div>
      </div>
    </div>
  );
};

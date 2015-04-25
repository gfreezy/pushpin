import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';


const title = (
  <h3>Panel title hellojkljlkj</h3>
);

const panelsInstance = (
  <div>
    <Panel header='Panel heading without title'>
      Panel content
    </Panel>
    <Panel header={title}>
      Panel content
    </Panel>
  </div>
);


React.render(panelsInstance, document.querySelector('#stage'));

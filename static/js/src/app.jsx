import React from 'react';
import Panel from 'react-bootstrap/lib/Panel';


const title = (
  <h3>Panel title</h3>
);

const panelsInstance = (
  <div>
    <Panel header='d ' style={{color: "red"}}>
      Panel content
    </Panel>
    <Panel header={title}>
      Panel content
    </Panel>
  </div>
);


React.render(panelsInstance, document.querySelector('#stage'));

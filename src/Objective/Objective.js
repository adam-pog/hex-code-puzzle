import React from 'react';
import './Objective.css';

function Objective(props) {
  return (
    <div>
      <h3 className='objectiveHeader'>Primary Access</h3>
      <div className="Objective">
        {
          props.objective.map((value,i) => {
            let className = props.progress[i] === value ? 'objectiveHighlight' : ''

            return(
              <div className={"ObjectiveTextContainer " + className} key={i}>
                <p key={i}>{value}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Objective;

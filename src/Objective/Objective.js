import React from 'react';
import './Objective.css';

function Objective(props) {
  return (
    <div>
      <p className='objectiveHeader'>Primary Access</p>
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

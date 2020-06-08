import React from 'react';
import './Objective.css';

function Objective(props) {
  const animateClass = (props.failed || props.success) ? 'noAnimation' : '';

  return (
    <div className='primaryObjective'>
      <h3 className='objectiveHeader'>Primary Access</h3>
      <div className={"Objective " + animateClass}>
        {
          props.objective.map((value,i) => {
            const highlightClass = props.progress[i] === value ? 'objectiveHighlight ' : ''

            return(
              <div
                className={
                  "ObjectiveTextContainer " +
                  highlightClass +
                  (props.failed ? 'objectiveFailed ' : '')
                }
                key={i}>
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

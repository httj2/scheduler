import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

// import Appointment from "components/Appointment"

const InterviewList = props => {
  console.log('i am props', props.interviewers)
  const interviewers = props.interviewers.map(interviewer => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={(event)=> props.onChange(interviewer.id)}
      />
    );
  });



  return (
<section className='interviewers'>
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{interviewers}</ul>
</section>
  )
}

export default InterviewList;
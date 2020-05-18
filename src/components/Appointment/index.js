import React from 'react';
import './styles.scss'
import Header from './Header.js'
import Show from './Show'
import Empty from './Empty'
import {useVisualMode} from "hooks/useVisualMode";
import Form from "components/Appointment/Form";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };
  
  const onCancel = () => {
    back();
  };
  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log('interview:', interview); 
    // console.log('props:', props.bookInterview(props.id, interview))
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch((err) => console.log('error', err));
    

  }

  return (
  <article className="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        
      />
    )}
    {mode === CREATE && (
      <Form 
        name = {props.name}  
        interviewers={props.interviewers}
        onCancel={onCancel}
        onSave={save}
      />
    )}
  </article>
  )


}
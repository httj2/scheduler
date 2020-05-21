import React from 'react';
import './styles.scss'
import Header from './Header.js'
import Show from './Show'
import Empty from './Empty'
import {useVisualMode} from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = 'EDIT'
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };
  
  const onCancel = () => {
    back();
  };

  function confirmDeletion() {
    transition(CONFIRM);
  }
  

  function save(name, interviewer) {
    if (interviewer && name) {
      const interview = {
        student: name,
        interviewer
      }
      if (mode === EDIT) {
        transition(SAVING)
        props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
      } else  {
        transition(SAVING)
        props
        .bookInterview(props.id, interview)
        .then(() => transition(SHOW))
        .catch((error) => transition(ERROR_SAVE, true));
      }
    } else {
      transition(ERROR_SAVE, true)
    }
  }

  function remove(id) {
    transition(DELETING, true)
    props
    .cancelInterview(id)
    .then(() => transition(EMPTY))
    .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
  <article className="appointment"data-testid="appointment">
    <Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={onAdd} />}
    {mode === SHOW && (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        confirmDeletion={() => confirmDeletion()}
        edit = {() =>transition(EDIT)}
        />
    )}
    {mode === CREATE && (
      <Form 
        name = {props.name}  
        interviewers={props.interviewers}
        onCancel={() => back()}
        onSave={(name, interviewer) => save(name, interviewer)}
      />
    )}
    {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete this appointment?"
          onCancel={() => transition(SHOW)}
          onConfirm={() => remove(props.id)}
        />
    )}
    {mode === EDIT && (
        <Form
        interviewers={props.interviewers}
        name={props.interview.student}
        onCancel={() => back()}
        onSave={(name, interviewer) => save(name, interviewer)}
      />
    )}
    {mode === SAVING && (
      <Status message= "Saving"
      />
    )}
    {mode === DELETING && (
      <Status message= "Deleting"
      />
    )}
     
    {mode === ERROR_SAVE && (
      <Error 
      message= "Could not make appointment."
      onClose={onCancel} 
      />
    )}
    {mode === ERROR_DELETE && (
    <Error 
      message= "Could not delete appointment."
      onClose={onCancel} 
      />
    )}
   
  </article>
  )
}
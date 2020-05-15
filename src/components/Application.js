import React, { useState, useEffect} from "react";
import axios from 'axios';
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
// import DayListItem from "components/DayListItem"


export default function Application(props) {
 
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });
  // const setDays = days => setState(prev => ({ ...prev, days }));
  const appointments = getAppointmentsForDay(state, state.day)


  
  useEffect(() => {
    const daysPromise =  axios.get('http://localhost:8001/api/days')
    const appointmentsPromise = axios.get('http://localhost:8001/api/appointments')
    const interviewersPromise = axios.get('http://localhost:8001/api/interviewers')
    Promise.all([
      Promise.resolve(daysPromise),
      Promise.resolve(appointmentsPromise),
      Promise.resolve(interviewersPromise)
    ]).then((all) => {
      setState(prev => ({ days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      const [daysPromise, appointmentsPromise, interviewersPromise] = all;
      console.log('hello', daysPromise, appointmentsPromise, interviewersPromise);
    })
    .catch((err) => console.log('didnt work:', err))
  }, [])


  

  const scheduleAppointments = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
    />
    );
  });
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}



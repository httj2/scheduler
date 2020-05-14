import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

// import DayListItem from "components/DayListItem"
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Janet Jones",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Jillian Michaels",
      interviewer: {
        id: 5,
        name: "Sven Jones",
        avatar: "https://i.imgur.com/twYrpay.jpg",
      }
    }
  },
];

export default function Application(props) {
  const [day, setDay] = useState(0);
  const [days, setDays] = useState([]);

  useEffect(()=> {
    axios
      .get('http://localhost:8001/api/days')
      .then((res)=> {
        setDays(res.data)
    })
    .catch((err) => console.log('didnt work:', err));
  }, [])

  const scheduleAppointments = appointments.map((appointment) => {
    return (
      <Appointment key={appointment.id} {...appointment} />
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
            days={days}
            day={day}
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



import {useState, useEffect} from "react"
import axios from 'axios';

export default function useApplicationData(){
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });
  const setDay = day => setState({ ...state, day });

  function decrementSpots (id) {
    for (let dayObj of state.days) {
        if (dayObj.appointments.includes(id)) {
             const daySpots = {
                ...dayObj,
                spots: dayObj.spots += - 1
            };
            let daysArray = [...state.days];
            daysArray[dayObj.id - 1] = daySpots;
            return daysArray;
        }
    }
  };
  function addSpots(id) {
    for (let dayObj of state.days) {
        if (dayObj.appointments.includes(id)) {
             const daySpots = {
                ...dayObj,
                spots: dayObj.spots += 1
            };
            let daysArray = [...state.days];
            daysArray[dayObj.id - 1] = daySpots;
            return daysArray;
        }
    }
  };
  function bookInterview(id, interview) {
    const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
          };
    const appointments = {
        ...state.appointments,
        [id]: appointment
      };
    const days = decrementSpots(id) 
    return axios.put(`http://localhost:8001/api/appointments/${id}`, {appointment})
      .then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
    const days = addSpots(id)

    return axios.delete(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      setState({
        ...state,
        appointments,
        days
      })
    })
  }
  
  useEffect(() => {
    const daysPromise =  axios.get('http://localhost:8001/api/days')
    const appointmentsPromise = axios.get('http://localhost:8001/api/appointments')
    const interviewersPromise = axios.get('http://localhost:8001/api/interviewers')
    Promise.all([
      Promise.resolve(daysPromise),
      Promise.resolve(appointmentsPromise),
      Promise.resolve(interviewersPromise)
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
      const [daysPromise, appointmentsPromise, interviewersPromise] = all;
    })
    .catch((err) => console.log('didnt work:', err))
  }, [])


  return { state, setDay, bookInterview, cancelInterview }


}

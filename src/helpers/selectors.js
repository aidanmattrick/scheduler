import * as _ from 'lodash';
export function getAppointmentsForDayId(state, dayId) {
  return state.days[dayId].appointments.map(apptIdx => state.appointments[apptIdx])
    .map(appt => { // each appt object has appt.interview.interviewer equal to the interviewer id
      let interviewData = null;
      if (appt.interview) {
        interviewData = { 
          interviewer: state.interviewers[appt.interview.interviewer] 
        }; 
      }
      // replace the interviewer id with the entire interviewer object based on that id
      return _.merge({}, appt, { interview: interviewData }); // 3rd arg: { interview: { interviewer: {...} } }
    });
}

export function getAppointmentsForDay(state, dayName) {
  let day = Object.values(state.days).find(day => day.name === dayName);  
  if (!day) return [];
  return getAppointmentsForDayId(state, day.id - 1);
};


export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer: interviewerId } = interview; 
  return { ...interview, student, interviewer: state.interviewers[interviewerId] }; // return { student: '', interviewer: {...} } 
}


export function getInterviewersForDayId(state, dayId) {
  return state.days[dayId].interviewers.map(interviewerId => state.interviewers[interviewerId]);
};

export function getInterviewersForDay(state, dayName) {
  let day = Object.values(state.days).find(day => day.name === dayName);  
  if (!day) return [];
  return getInterviewersForDayId(state, day.id - 1);
};

export function withState(state) {
  let fns = { getAppointmentsForDayId, getAppointmentsForDay, getInterview, getInterviewersForDay, getInterviewersForDayId };
  return _.mapValues(fns, fn => _.bind(fn, null, state));
}

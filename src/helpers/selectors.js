export function getAppointmentsForDayId(state, dayId) {
  return state.days[dayId].appointments.map(apptIdx => state.appointments[apptIdx]);
};

export function getAppointmentsForDay(state, dayName) {
  let day = Object.values(state.days).find(day => day.name === dayName);  
  if (!day) return [];
  return getAppointmentsForDayId(state, day.id - 1);
};


export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer: interviewerId } = interview; 
  return { student, interviewer: state.interviewers[interviewerId] }; // return { student: '', interviewer: {...} } 
}

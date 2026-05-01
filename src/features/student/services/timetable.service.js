import { getStudentSchedule } from '../../../api';

export const fetchTodayScheduleService = async () => {
  return await getStudentSchedule();
};

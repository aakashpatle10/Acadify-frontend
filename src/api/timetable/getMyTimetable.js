import axios from '../../lib/apiClient';

export const getMyTimetable = async () => {
  const res = await axios.get('/timetable/my');
  return res.data?.data;
};

export const getTimetable = getMyTimetable;

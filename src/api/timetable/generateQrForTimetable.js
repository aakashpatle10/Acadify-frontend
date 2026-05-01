import axios from '../../lib/apiClient';

export const generateQrForTimetable = async ({ timetableId, expiresInSeconds = 5 }) => {
  const res = await axios.post('/qr/generate', { timetableId, expiresInSeconds });
  return res.data;
};

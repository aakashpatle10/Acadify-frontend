import api from "../../config/axios";


export const generateQrForTimetable = async ({ timetableId, expiresInSeconds = 5 }) => {
    const response = await api.post('/qr/generate', {
        timetableId,
        expiresInSeconds
    });
    return response.data;
};

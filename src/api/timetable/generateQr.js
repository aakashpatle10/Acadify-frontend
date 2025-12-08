import api from "../../config/axios";

// Generate QR code for a timetable slot
export const generateQrForTimetable = async ({ timetableId, expiresInSeconds = 10 }) => {
    const response = await api.post('/qr/generate', {
        timetableId,
        expiresInSeconds
    });
    return response.data;
};

import api from "../../config/axios";

export const getTimetable = async () => {

    const response = await api.get(`api/timetable/`);
    return response.data?.data;

};

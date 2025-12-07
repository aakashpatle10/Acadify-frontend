import { useMutation,useQuery } from "@tanstack/react-query";
import api from "../../../api";


export const useGetTimetable = () => {
    return useQuery({
        queryKey: ["timetable"],
        queryFn: () => api.getTimetable(),
    });
};
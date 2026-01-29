import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyTimetable, generateQrForTimetable } from "../../../api";

export const useMyTimetable = () => {
    return useQuery({
        queryKey: ["myTimetable"],
        queryFn: getMyTimetable,
        staleTime: 5 * 60 * 1000, 
    });
};


export const useTodayClasses = () => {
    const { data: timetable, ...rest } = useMyTimetable();

    
    const DEBUG_SHOW_ALL_CLASSES = true;

    
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    
    console.log('🔍 DEBUG - Full Timetable Data:', timetable);
    console.log('📅 DEBUG - Today is:', today);
    console.log('🚨 DEBUG MODE:', DEBUG_SHOW_ALL_CLASSES ? 'SHOWING ALL CLASSES' : 'FILTERING BY DAY');

    
    const todaysClasses = DEBUG_SHOW_ALL_CLASSES
        ? (timetable || [])  
        : (timetable?.filter(slot => {
            console.log(`🔍 Checking slot: ${slot.subject} - Day: "${slot.day}" vs Today: "${today}"`);
            return slot.day === today;
        }) || []);

    console.log('✅ DEBUG - Today\'s Classes:', todaysClasses);

    return {
        data: todaysClasses,
        ...rest
    };
};

export const useGenerateQr = () => {
    return useMutation({
        mutationFn: generateQrForTimetable,
    });
};

export const useGetTimetable = useMyTimetable;
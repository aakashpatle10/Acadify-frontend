import { useMutation, useQuery } from "@tanstack/react-query";
import { getMyTimetable, generateQrForTimetable } from "../../../api";

// Hook to fetch logged-in teacher's timetable
export const useMyTimetable = () => {
    return useQuery({
        queryKey: ["myTimetable"],
        queryFn: getMyTimetable,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Hook to get today's classes only
export const useTodayClasses = () => {
    const { data: timetable, ...rest } = useMyTimetable();

    // DEBUG FLAG: Set to true to see all classes (for debugging)
    const DEBUG_SHOW_ALL_CLASSES = true;

    // Get current day name (Monday, Tuesday, etc.)
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    // DEBUG: Log timetable data and today's day
    console.log('🔍 DEBUG - Full Timetable Data:', timetable);
    console.log('📅 DEBUG - Today is:', today);
    console.log('🚨 DEBUG MODE:', DEBUG_SHOW_ALL_CLASSES ? 'SHOWING ALL CLASSES' : 'FILTERING BY DAY');

    // Filter timetable for today's classes
    const todaysClasses = DEBUG_SHOW_ALL_CLASSES
        ? (timetable || [])  // Show all classes in debug mode
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

// Hook to generate QR code for a timetable slot
export const useGenerateQr = () => {
    return useMutation({
        mutationFn: generateQrForTimetable,
    });
};

// Legacy hook for backward compatibility
export const useGetTimetable = useMyTimetable;
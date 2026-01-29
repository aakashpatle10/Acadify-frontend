import React, { useState, useEffect, useRef } from 'react';
import { BsX, BsQrCode } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { BsPersonX } from 'react-icons/bs';
import { useGenerateQr } from '../hooks/teacherApi.jsx';

const AttendanceOverlay = ({ isOpen, onClose, classInfo }) => {
  const [stats, setStats] = useState({ present: 3, total: 6 });
  const [qrDataUri, setQrDataUri] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [isAutoRefreshActive, setIsAutoRefreshActive] = useState(false);

  const refreshIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  
  const { mutate: generateQr, isPending: isGeneratingQr, isError: qrError } = useGenerateQr();

  
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  
  useEffect(() => {
    if (!isOpen) {
      setQrDataUri(null);
      setIsAutoRefreshActive(false);
      setCountdown(5);

      
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  
  const handleGenerateQr = () => {
    if (!classInfo?._id) {
      alert('Invalid class information');
      return;
    }

    generateQr(
      {
        timetableId: classInfo._id,
        expiresInSeconds: 5
      },
      {
        onSuccess: (data) => {
          setQrDataUri(data.qrDataUri);
          setCountdown(5);

          
          if (!isAutoRefreshActive) {
            setIsAutoRefreshActive(true);
            startAutoRefresh();
          }
        },
        onError: (error) => {
          console.error('QR generation failed:', error);
          alert('Failed to generate QR code. Please try again.');
        }
      }
    );
  };

  
  const startAutoRefresh = () => {
    
    if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

    
    setCountdown(5);

    
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        const newCount = prev - 1;
        
        return newCount <= 0 ? 5 : newCount;
      });
    }, 1000);

    
    refreshIntervalRef.current = setInterval(() => {
      if (classInfo?._id) {
        
        setCountdown(5);

        generateQr(
          {
            timetableId: classInfo._id,
            expiresInSeconds: 10
          },
          {
            onSuccess: (data) => {
              setQrDataUri(data.qrDataUri);
              console.log('🔄 QR Code auto-refreshed at', new Date().toLocaleTimeString());
            },
            onError: (error) => {
              console.error('Auto-refresh failed:', error);
            }
          }
        );
      }
    }, 5000); 
  };

  
  const stopAutoRefresh = () => {
    setIsAutoRefreshActive(false);

    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  const [students, setStudents] = useState([
    { name: "Shubham", id: "ST001", time: "11:02 AM", status: "present" },
    { name: "Rishabh", id: "ST004", time: "11:05 AM", status: "present" },
    { name: "Rohan", id: "ST002", time: "11:03 AM", status: "present" },
    { name: "Amit", id: "ST005", status: "absent" },
    { name: "Rohil", id: "ST003", status: "absent" },
    { name: "Ayush", id: "ST006", status: "absent" }
  ]);

  
  useEffect(() => {
    const presentCount = students.filter(s => s.status === 'present').length;
    setStats({ present: presentCount, total: students.length });
  }, [students]);

  const toggleAttendance = (studentId) => {
    setStudents(prev =>
      prev.map(student => {
        if (student.id === studentId) {
          const newStatus = student.status === 'present' ? 'absent' : 'present';
          return {
            ...student,
            status: newStatus,
            time: newStatus === 'present' ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : null
          };
        }
        return student;
      })
    );
  };

  const handleSave = () => {
    console.log('Saving attendance:', students);
    stopAutoRefresh(); 
    onClose();
  };

  if (!isOpen) return null;

  const attendancePercentage = Math.round((stats.present / stats.total) * 100);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 overflow-hidden p-4" onClick={handleOverlayClick}>
      <div className="bg-white rounded-2xl w-full max-w-6xl h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
        {}
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Attendance Control</h2>
            <p className="text-gray-600 mt-1 text-sm">{classInfo.subject} • {classInfo.startTime} - {classInfo.endTime} • {classInfo.classSessionId?.name}</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors" onClick={onClose}>
            <BsX size={28} />
          </button>
        </div>

        {}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6 p-6 overflow-hidden">
          {}
          <div className="flex flex-col gap-4 overflow-y-auto">
            {}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BsQrCode className="text-blue-600" size={20} />
                QR Code Generator
              </h3>

              {}
              <div className="flex items-center justify-center mb-4">
                <div className="w-full max-w-[240px] aspect-square border-4 border-dashed border-blue-300 rounded-2xl flex flex-col items-center justify-center bg-white shadow-inner p-3">
                  {qrDataUri ? (
                    <img
                      src={qrDataUri}
                      alt="QR Code"
                      className="w-full h-full object-contain"
                    />
                  ) : isGeneratingQr ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
                      <p className="text-gray-600 text-sm font-medium">Generating...</p>
                    </div>
                  ) : (
                    <>
                      <BsQrCode className="text-gray-300 text-5xl mb-2" />
                      <p className="text-gray-400 text-xs font-medium text-center">Click below to generate</p>
                    </>
                  )}
                </div>
              </div>

              {}
              {isAutoRefreshActive && (
                <div className="bg-green-100 border-2 border-green-300 rounded-xl p-2.5 mb-3 text-center shadow-sm">
                  <p className="text-sm text-green-800 font-semibold flex items-center justify-center gap-2">
                    <span className="animate-spin">🔄</span>
                    Auto-refreshing in {countdown}s
                  </p>
                </div>
              )}

              {}
              <div className="bg-white border border-gray-200 rounded-xl p-3 mb-3 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Class Name</p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {classInfo?.classSessionId?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Subject</p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {classInfo?.subject || 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              {}
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={handleGenerateQr}
                disabled={isGeneratingQr}
              >
                <BsQrCode size={20} />
                {isGeneratingQr ? 'Generating...' : isAutoRefreshActive ? '✓ QR Active' : 'Generate QR Code'}
              </button>

              {}
              {qrError && (
                <p className="text-red-600 text-sm mt-2 text-center font-medium">
                  ⚠️ Failed to generate QR code
                </p>
              )}
            </div>
          </div>

          {}
          <div className="flex flex-col h-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            {}
            <div className="p-4 border-b-2 border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-gray-900">Real-time Monitor</h3>
                <div className="text-3xl font-bold text-blue-600">{attendancePercentage}%</div>
              </div>
              <div className="text-xs text-gray-600 font-medium">{stats.present}/{stats.total} Students Present</div>
            </div>

            {}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {students.map(student => (
                <div
                  key={student.id}
                  className={`flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:shadow-md transition-all border ${student.status === 'present' ? 'border-green-300 hover:border-green-400 bg-green-50' : 'border-red-200 hover:border-red-300'
                    }`}
                  onClick={() => toggleAttendance(student.id)}
                  title="Click to toggle"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${student.status === 'present' ? 'bg-green-200' : 'bg-red-200'
                      }`}>
                      {student.status === 'present' ? (
                        <FaCheckCircle className="text-green-700 text-base" />
                      ) : (
                        <BsPersonX className="text-red-700 text-base" />
                      )}
                    </div>

                    {}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{student.name}</h4>
                      <p className="text-xs text-gray-500 truncate">{student.id}</p>
                    </div>
                  </div>

                  {}
                  <div className="flex items-center gap-2">
                    {student.time && (
                      <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                        {student.time}
                      </span>
                    )}
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${student.status === 'present'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                      }`}>
                      {student.status === 'present' ? '✓' : '✗'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {}
            <div className="p-3 bg-blue-50 border-t-2 border-blue-200">
              <p className="text-xs text-gray-700 text-center font-medium">💡 Click student to manually toggle attendance</p>
            </div>
          </div>
        </div>

        {}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
          <button
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            onClick={handleSave}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Save Attendance
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceOverlay;
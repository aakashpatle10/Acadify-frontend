import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { BsCheckCircle, BsXCircle, BsX } from 'react-icons/bs';

const QrScanner = ({ isOpen, onClose }) => {
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const html5QrCodeRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                initializeScanner();
            }, 100);
            return () => clearTimeout(timer);
        } else {
            cleanupScanner();
        }
    }, [isOpen]);

    useEffect(() => {
        return () => {
            cleanupScanner();
        };
    }, []);

    const initializeScanner = async () => {
        try {
            if (html5QrCodeRef.current) {
                await cleanupScanner();
            }

            const html5QrCode = new Html5Qrcode("qr-reader");
            html5QrCodeRef.current = html5QrCode;

            const config = {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0
            };

            await html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess,
                onScanError
            );

            setScanning(true);
            setError(null);
        } catch (err) {
            console.error('Error starting scanner:', err);
            setError('Could not start camera. Please ensure permissions are granted.');
            setScanning(false);
        }
    };

    const cleanupScanner = async () => {
        if (html5QrCodeRef.current) {
            try {
                if (html5QrCodeRef.current.isScanning) {
                    await html5QrCodeRef.current.stop();
                }
                html5QrCodeRef.current.clear();
            } catch (err) {
                console.error('Error stopping scanner:', err);
            }
            html5QrCodeRef.current = null;
            setScanning(false);
        }
    };

    const onScanSuccess = async (decodedText) => {
        await cleanupScanner();

        try {
            let classId = null;
            let date = null;

            try {
                const parsed = JSON.parse(decodedText);
                if (parsed.classId && parsed.date) {
                    classId = parsed.classId;
                    date = parsed.date;
                }
            } catch (e) {
            }

            if (!classId) {
                try {
                    const base64Url = decodedText.split('.')[1];
                    if (base64Url) {
                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(
                            atob(base64).split('').map(function (c) {
                                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                            }).join('')
                        );

                        const payload = JSON.parse(jsonPayload);

                        if (payload.classSessionId) {
                            classId = payload.classSessionId;
                            date = new Date().toISOString().split('T')[0];
                        }
                    }
                } catch (e) {
                    console.error("Failed to decode QR token:", e);
                }
            }

            if (!classId || !date) {
                throw new Error("Invalid QR code format. Could not identify Class information.");
            }

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/student/attendance/mark`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ classId, date })
                }
            );

            const data = await response.json();

            if (data.success) {
                setResult({ type: "success", message: "Attendance marked successfully! ✅" });
            } else {
                if (data.message === "Token expired" || data.message === "Unauthorized") {
                    setResult({
                        type: "error",
                        message: "Session expired. Please logout and login again."
                    });
                } else {
                    setResult({ type: "error", message: data.message || "Failed to mark attendance" });
                }
            }
        } catch (err) {
            console.error(err);
            setResult({ type: "error", message: err.message || "Invalid QR or network error" });
        }
    };

    const onScanError = (errorMessage) => {
    };

    const handleClose = async () => {
        await cleanupScanner();
        setResult(null);
        setError(null);
        onClose();
    };

    const handleRetry = () => {
        setResult(null);
        setError(null);
        initializeScanner();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden relative">

                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Scan Attendance QR</h2>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                    >
                        <BsX className="text-2xl text-gray-600" />
                    </button>
                </div>

                <div className="p-6">
                    {!result && (
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-square">
                            <div id="qr-reader" className="w-full h-full"></div>
                            {!scanning && !error && (
                                <div className="absolute inset-0 flex items-center justify-center text-white">
                                    <span className="loading loading-spinner loading-lg">Starting Camera...</span>
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="text-center py-4">
                            <div className="text-red-500 mb-2">⚠️ {error}</div>
                            <button
                                onClick={handleRetry}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {result && (
                        <div className={`text-center py-6 px-4 rounded-xl ${result.type === 'success' ? 'bg-green-50' : 'bg-red-50'
                            }`}>
                            {result.type === 'success' ? (
                                <BsCheckCircle className="text-5xl text-green-600 mx-auto mb-3" />
                            ) : (
                                <BsXCircle className="text-5xl text-red-600 mx-auto mb-3" />
                            )}
                            <h3 className={`text-lg font-bold mb-2 ${result.type === 'success' ? 'text-green-800' : 'text-red-800'
                                }`}>
                                {result.type === 'success' ? 'Success!' : 'Error'}
                            </h3>
                            <p className="text-gray-700 mb-6">{result.message}</p>

                            <div className="flex gap-3 justify-center">
                                {result.type !== 'success' && (
                                    <button
                                        onClick={handleRetry}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Try Again
                                    </button>
                                )}
                                <button
                                    onClick={handleClose}
                                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                    {!result && !error && (
                        <p className="text-center text-sm text-gray-500 mt-4">
                            Align the QR code within the frame to scan
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QrScanner;

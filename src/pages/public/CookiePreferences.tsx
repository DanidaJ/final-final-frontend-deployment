import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CookiePreferences: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        marketing: false,
    });
    const navigate = useNavigate();

    const togglePreference = (key: string) => {
        setPreferences((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
    };

    const handleClose = () => {
        setIsOpen(false);
        navigate(-1); // Redirect to the previous page
    };

    const acceptAll = () => {
        setPreferences({ essential: true, analytics: true, marketing: true });
        handleClose();
    };

    const rejectAll = () => {
        setPreferences({ essential: true, analytics: false, marketing: false });
        handleClose();
    };

    const savePreferences = () => {
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-700 via-blue-600 to-black bg-opacity-95 flex justify-center items-center z-50 p-4 overflow-hidden">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full border border-gray-300 relative overflow-hidden">
                <h2 className="text-3xl font-bold text-[#1E3A5F] relative">Manage Your Cookie Preferences</h2>
                <p className="text-gray-600 mt-3 relative">
                    We use cookies to enhance your browsing experience, analyze site traffic, and serve personalized content. You can customize your preferences below.
                </p>

                <div className="mt-5 space-y-4 relative">
                    <CookieToggle label="Essential Cookies (Required) 🛡️" checked={preferences.essential} disabled />
                    <p className="text-gray-500 text-sm">These cookies are necessary for the website to function properly and cannot be disabled.</p>
                    <CookieToggle label="Analytics Cookies 📊" checked={preferences.analytics} onChange={() => togglePreference("analytics")} />
                    <p className="text-gray-500 text-sm">Help us understand how visitors interact with our site by collecting anonymized data.</p>
                    <CookieToggle label="Marketing Cookies 🎯" checked={preferences.marketing} onChange={() => togglePreference("marketing")} />
                    <p className="text-gray-500 text-sm">Used to show relevant ads and measure campaign effectiveness.</p>
                </div>

                <div className="flex justify-end space-x-4 mt-8 relative">
                    <button onClick={rejectAll} className="px-5 py-2 text-gray-700 bg-gray-200 rounded-xl hover:bg-gray-300 transition">Reject All</button>
                    <button onClick={savePreferences} className="px-5 py-2 text-white bg-[#1E3A5F] rounded-xl hover:bg-[#12202F] transition shadow-lg shadow-blue-500/50">Save Preferences</button>
                    <button onClick={acceptAll} className="px-5 py-2 text-white bg-green-600 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/50">Accept All</button>
                </div>
            </div>
            <style>
                {`
                    @keyframes gradient-move {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-move {
                        background: linear-gradient(-45deg, #6a0dad, #007bff, #000000, #ffffff);
                        background-size: 400% 400%;
                        animation: gradient-move 6s ease infinite;
                    }
                `}
            </style>
        </div>
    );
};

const CookieToggle: React.FC<{ label: string; checked: boolean; onChange?: () => void; disabled?: boolean }> = ({ label, checked, onChange, disabled }) => (
    <label className="flex items-center justify-between p-4 bg-gray-100 rounded-xl shadow-md">
        <span className="text-gray-800 font-medium">{label}</span>
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className="w-6 h-6 text-[#1E3A5F] border-gray-300 rounded focus:ring-[#1E3A5F] disabled:opacity-50"
        />
    </label>
);

export default CookiePreferences;




const SettingsPage = () => {
    return (
        <div className="relative min-h-screen text-black dark:text-white flex flex-col justify-center items-center px-6 py-12">
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900"></div>
                <div className="absolute inset-0 bg-grid-slate-300 dark:bg-grid-slate-800 mask-gradient"></div>
            </div>



            {/* Settings Page */}
            <div className="max-w-4xl mt-12 p-8 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg text-left">
                <h2 className="text-3xl font-semibold text-blue-600 dark:text-blue-400 mb-4"><center>Settings</center></h2>
                <ul className="space-y-6">
                    {[
                        { title: "Account Settings", desc: "Update username, change password, and enable 2FA." },
                        { title: "Privacy Settings", desc: "Control who can view your profile and contact you." },
                        { title: "Notification Preferences", desc: "Choose how to receive alerts via email, SMS, or in-app." },
                        { title: "Communication Preferences", desc: "Manage email, SMS, and push notifications for announcements." },
                        { title: "Language and Accessibility", desc: "Set preferred language and accessibility options." },
                    ].map((item, index) => (
                        <li key={index} className="bg-gray-200 dark:bg-gray-800 p-4 rounded-lg shadow-md">
                            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SettingsPage;

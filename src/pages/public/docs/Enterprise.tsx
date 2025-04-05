import { motion } from 'framer-motion';

const Enterprise = () => {
    const caseStudies = [
        {
            title: "Corporate Training Schedules",
            description: "A multinational company used ChronoTix to automate employee training schedules across multiple time zones.",
            details: "With AI-driven scheduling, training sessions were optimized to accommodate various regions, reducing scheduling conflicts by 70%.",
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h11m-6 8h6m-3-4h3m-3-4h6m-6-4h3m-3-4h6" />
                </svg>
            )
        },
        {
            title: "Automating Conference Room Bookings",
            description: "A financial institution leveraged ChronoTix to efficiently book meeting spaces based on real-time availability.",
            details: "The AI-powered system streamlined the booking process, ensuring optimal resource utilization across all office locations.",
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-white">Enterprise Case Studies</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        Discover how businesses streamline operations using ChronoTix.
                    </p>
                </motion.div>

                <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2">
                    {caseStudies.map((study, index) => (
                        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="flex items-center gap-4 mb-4">{study.icon}<h3 className="text-lg font-semibold">{study.title}</h3></div>
                            <p className="text-gray-600 dark:text-gray-300">{study.description}</p>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{study.details}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Enterprise;
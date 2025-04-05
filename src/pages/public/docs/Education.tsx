import { motion } from 'framer-motion';

const Education = () => {
    const caseStudies = [
        {
            title: "Optimizing University Timetables",
            description: "A leading university used ChronoTix to automate and optimize scheduling, reducing conflicts by 80%.",
            details: "By integrating faculty preferences and student demand, the system generated optimized schedules that minimized conflicts and ensured efficient use of classrooms.",
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422a12 12 0 11-12.32 0L12 14zM12 14v8" />
                </svg>
            )
        },
        {
            title: "Enhancing Student Accessibility",
            description: "A mid-sized college leveraged ChronoTix to personalize schedules for students with accessibility needs.",
            details: "By considering accessibility constraints, the system ensured students had classes in accessible buildings, minimizing long transitions and scheduling issues.",
            icon: (
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 0v6m-6 0a6 6 0 0112 0H6z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
                    <h1 className="text-4xl font-bold text-blue-600 dark:text-white">Education Case Studies</h1>
                    <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
                        See how universities and colleges use ChronoTix to enhance academic scheduling.
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

export default Education;
import { motion } from 'framer-motion';

const TemplatesLibrary: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section with Gradient Background */}
            <div className="relative bg-white dark:bg-gray-900">
                <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]" />
                <div className="relative max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 mt-16 rounded-2xl bg-black dark:bg-[#1F3B62] shadow-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl font-bold dark:text-white text-blue-300 sm:text-5xl lg:text-6xl">
                            Templates Library
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Browse and download ready-made templates to streamline your scheduling workflow
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8">
                        <div className="max-w-3xl mx-auto mb-12 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Downloadable Templates
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Get started quickly with our professionally designed templates. Each template is carefully crafted to help you manage schedules, track progress, and optimize your workflow efficiently.
                            </p>
                        </div>

                        {/* Templates Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {templates.map((template, index) => (
                                <motion.div
                                    key={template.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex"
                                >
                                    <TemplateCard {...template} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

// Template Card Component
const TemplateCard: React.FC<{ title: string; description: string; filePath: string; thumbnail: string }> = ({
    title,
    description,
    filePath,
    thumbnail
}) => (
    <div className="group relative w-full">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 h-full flex flex-col shadow-lg hover:shadow-xl transition-all duration-200">
            <div className="aspect-w-16 aspect-h-9 mb-4 relative rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow duration-200">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 group-hover:opacity-0 transition-opacity" />
                <img
                    src={thumbnail}
                    alt={`${title} preview`}
                    className="w-full h-full object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-200"
                />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-grow">
                {description}
            </p>
            <a
                href={filePath}
                download
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                    text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                    dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600
                    shadow-sm hover:shadow-md w-full justify-center group-hover:translate-y-[-1px]"
            >
                <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                </svg>
                Download Template
            </a>
        </div>
    </div>
);

// Templates Data
const templates = [
    {
        title: "Weekly Schedule Template",
        description: "A comprehensive template for organizing weekly schedules with automatic time slot allocation and conflict detection.",
        filePath: "/templates/weekly_schedule.xlsx",
        thumbnail: "/templates/thumbnails/weekly_schedule.jpg"
    },
    {
        title: "Classroom Allocation Sheet",
        description: "Efficiently manage classroom allocations with this smart template featuring capacity tracking and resource management.",
        filePath: "/templates/classroom_allocation.xlsx",
        thumbnail: "/templates/thumbnails/classroom_allocation.jpg"
    },
    {
        title: "Student Attendance Tracker",
        description: "Monitor and manage student attendance records with automated calculations and reporting features.",
        filePath: "/templates/student_attendance.xlsx",
        thumbnail: "/templates/thumbnails/student_attendance.jpg"
    },
    {
        title: "Faculty Availability Form",
        description: "Track faculty availability with this intuitive template that includes preference management and workload balancing.",
        filePath: "/templates/faculty_availability.docx",
        thumbnail: "/templates/thumbnails/faculty_availability.jpg"
    },
    {
        title: "Lecture Planning Sheet",
        description: "Organize and plan lectures with this comprehensive template featuring resource allocation and timeline management.",
        filePath: "/templates/lecture_planning.doc",
        thumbnail: "/templates/thumbnails/lecture_planning.jpg"
    },
    {
        title: "Exam Timetable Template",
        description: "Plan and manage exam schedules effectively with built-in conflict resolution and room capacity optimization.",
        filePath: "/templates/exam_timetable.xlsx",
        thumbnail: "/templates/thumbnails/exam_timetable.jpg"
    }
];

export default TemplatesLibrary;

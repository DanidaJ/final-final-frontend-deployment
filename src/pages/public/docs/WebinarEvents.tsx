import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    speaker: string;
    description: string;
    registrationLink: string;
    type: 'webinar' | 'workshop' | 'conference';
}

const WebinarsEvents: React.FC = () => {
    const [filter, setFilter] = useState<string>('all');

    const upcomingEvents: Event[] = [
        {
            id: '1',
            title: "Advanced Scheduling Techniques",
            date: "March 15, 2025",
            time: "2:00 PM - 3:30 PM EST",
            speaker: "Dr. Jane Smith",
            description: "Learn advanced techniques for optimizing your scheduling workflow and managing complex timetables efficiently.",
            registrationLink: "/register/advanced-scheduling",
            type: 'webinar'
        },
        {
            id: '2',
            title: "Integration Workshop: ChronoTix & CRM Systems",
            date: "March 22, 2025",
            time: "10:00 AM - 12:00 PM EST",
            speaker: "Michael Rodriguez, Integration Specialist",
            description: "Hands-on workshop for integrating ChronoTix with popular CRM systems to streamline your customer scheduling experience.",
            registrationLink: "/register/integration-workshop",
            type: 'workshop'
        },
        {
            id: '3',
            title: "Educational Institutions: Scheduling Best Practices",
            date: "April 5, 2025",
            time: "1:00 PM - 2:00 PM EST",
            speaker: "Prof. Elizabeth Chen",
            description: "Special webinar for educational institutions on optimizing class schedules, room allocations, and managing academic calendars.",
            registrationLink: "/register/edu-best-practices",
            type: 'webinar'
        },
        {
            id: '4',
            title: "ChronoTix Spring Conference 2025",
            date: "April 18-20, 2025",
            time: "9:00 AM - 5:00 PM EST Daily",
            speaker: "Various Industry Experts",
            description: "Three-day virtual conference featuring keynotes, customer success stories, product updates, and networking opportunities.",
            registrationLink: "/register/spring-conference-2025",
            type: 'conference'
        }
    ];

    const pastRecordings: Event[] = [
        {
            id: '5',
            title: "Getting Started with ChronoTix",
            date: "February 10, 2025",
            time: "2:00 PM - 3:00 PM EST",
            speaker: "Thomas Wilson, Product Specialist",
            description: "Introductory session covering the basics of setting up and configuring your ChronoTix environment.",
            registrationLink: "/recordings/getting-started",
            type: 'webinar'
        },
        {
            id: '6',
            title: "Customizing Your Scheduling Templates",
            date: "January 25, 2025",
            time: "11:00 AM - 12:30 PM EST",
            speaker: "Sarah Johnson, UX Designer",
            description: "Learn how to create and customize scheduling templates to match your brand and improve user experience.",
            registrationLink: "/recordings/custom-templates",
            type: 'workshop'
        }
    ];

    const filteredUpcoming = filter === 'all'
        ? upcomingEvents
        : upcomingEvents.filter(event => event.type === filter);

    const filteredPast = filter === 'all'
        ? pastRecordings
        : pastRecordings.filter(event => event.type === filter);

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
                            Webinars & Events
                        </h1>
                        <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
                            Join our live sessions and learning events to master the ChronoTix scheduling system
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-72 flex-shrink-0"
                    >
                        <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200/50 dark:border-gray-700/50">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                Filter Events
                            </h2>
                            <div className="grid gap-2">
                                <FilterButton
                                    label="All Events"
                                    onClick={() => setFilter('all')}
                                    active={filter === 'all'}
                                />
                                <FilterButton
                                    label="Webinars"
                                    onClick={() => setFilter('webinar')}
                                    active={filter === 'webinar'}
                                />
                                <FilterButton
                                    label="Workshops"
                                    onClick={() => setFilter('workshop')}
                                    active={filter === 'workshop'}
                                />
                                <FilterButton
                                    label="Conferences"
                                    onClick={() => setFilter('conference')}
                                    active={filter === 'conference'}
                                />
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex-1"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200/50 dark:border-gray-700/50">
                            {/* Upcoming Events Section */}
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Upcoming Events
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    Register for our upcoming live webinars and events to enhance your scheduling skills.
                                </p>
                                <div className="space-y-6">
                                    {filteredUpcoming.length > 0 ? (
                                        filteredUpcoming.map((event, index) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <EventCard
                                                    event={event}
                                                    buttonText="Register Now"
                                                    isUpcoming={true}
                                                />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <EmptyState message="No upcoming events matching your current filter." />
                                    )}
                                </div>
                            </div>

                            {/* Past Recordings Section */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                    Past Recordings
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 mb-8">
                                    Access recordings of our previous webinars and events.
                                </p>
                                <div className="space-y-6">
                                    {filteredPast.length > 0 ? (
                                        filteredPast.map((event, index) => (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                            >
                                                <EventCard
                                                    event={event}
                                                    buttonText="Watch Recording"
                                                    isUpcoming={false}
                                                />
                                            </motion.div>
                                        ))
                                    ) : (
                                        <EmptyState message="No past recordings matching your current filter." />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.main>
                </div>
            </div>
        </div>
    );
};

const EventCard: React.FC<{
    event: Event;
    buttonText: string;
    isUpcoming: boolean;
}> = ({ event, buttonText, isUpcoming }) => (
    <div className="group relative">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl opacity-25 group-hover:opacity-50 transition-opacity blur-[1px]" />
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all duration-200">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                        <EventTypeBadge type={event.type} />
                        <span className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                            {event.date} • {event.time}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {event.speaker}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {event.description}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <Link
                        to={event.registrationLink}
                        className="inline-flex items-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200
                            text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                            dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600
                            shadow-sm hover:shadow-md w-full md:w-auto justify-center group-hover:translate-y-[-1px]"
                    >
                        {isUpcoming ? (
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        )}
                        {buttonText}
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

const EventTypeBadge: React.FC<{ type: Event['type'] }> = ({ type }) => {
    const gradients = {
        webinar: 'from-blue-600 to-blue-400',
        workshop: 'from-green-600 to-green-400',
        conference: 'from-purple-600 to-purple-400'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${gradients[type]} shadow-sm`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
    );
};

const FilterButton: React.FC<{
    label: string;
    onClick: () => void;
    active: boolean;
}> = ({ label, onClick, active }) => (
    <button
        onClick={onClick}
        className={`relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 overflow-hidden
            ${active
                ? 'text-white shadow-md hover:shadow-lg transform hover:-translate-y-[1px]'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-sm hover:shadow-md'
            }`}
    >
        {active && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500" />
        )}
        <span className="relative">{label}</span>
    </button>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
    <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
        <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
        </svg>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            {message}
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
            Try adjusting your filters to find more events.
        </p>
    </div>
);

export default WebinarsEvents;
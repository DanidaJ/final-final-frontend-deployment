import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from '../components/common/Layout'
import { useAuth } from '../contexts/AuthContext'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import DashboardRouter from '../components/dashboard/DashboardRouter'
import ErrorBoundary from '../components/common/ErrorBoundary'

// Public Pages
import LandingPage from '../pages/public/LandingPage'
import LoginPage from '../pages/public/LoginPage'
import CreateAccountPage from '../pages/public/CreateAccountPage'
import CreateUniversityPage from '../pages/public/CreateUniversityPage'
import AboutPage from '../pages/public/AboutPage'
import PricingPage from '../pages/public/PricingPage'
import ResourcesPage from '../pages/public/ResourcesPage'
import ContactPage from '../pages/public/ContactPage'
import RegisterPage from '../pages/public/RegisterPage'
import SolutionsPage from '../pages/public/SolutionsPage'
import Privacy from '../pages/public/Privacy'
import Terms from "../pages/public/Terms.tsx";
import Documentation from '../pages/public/Documentation'
import GettingStarted from '../pages/public/docs/GettingStarted';
import DocumentationPractices from '../pages/public/docs/DocumentationPractices';
import FAQ from '../pages/public/docs/FAQ';
import Features from '../pages/public/docs/Features';
import PracticesGuide from '../pages/public/docs/PracticesGuide';
import ProTips from '../pages/public/docs/ProTips';
import TroubleShoot from '../pages/public/docs/TroubleShoot';
import VideoTutorials from "../pages/public/docs/VideoTutorials";
import CommunityForum from "../pages/public/docs/CommunityForum";
import ReportIssues from "../pages/public/docs/ReportIssues";
import CaseStudies from "../pages/public/docs/CaseStudies";
import TemplatesLibrary from '../pages/public/docs/TemplatesLibrary';
import WebinarEvents from '../pages/public/docs/WebinarEvents';
import IntegrationGuides from "../pages/public/docs/IntegrationGuides.tsx";
import CookiePreferences from '../pages/public/CookiePreferences'
import APIAuthentication from '../pages/public/docs/APIAuthentication';
import APIEndpoints from '../pages/public/docs/APIEndpoints';
import APIRateLimits from '../pages/public/docs/APIRateLimits';
import APIWebhooks from '../pages/public/docs/APIWebhooks';
import APIErrors from '../pages/public/docs/APIErrors'
import TechSupport from '../pages/public/docs/TechSupport';
import FeatureReq from '../pages/public/docs/FeatureReq';
import Announcements from '../pages/public/docs/Announcements';
import Education from '../pages/public/docs/Education';
import Enterprise from '../pages/public/docs/Enterprise';



// Dashboard Pages
import AdminDashboard from '../pages/dashboard/AdminDashboard'
import ProfilePage from '../pages/dashboard/ProfilePage'
import SettingsPage from '../pages/dashboard/SettingsPage'
import LecturersList from '../pages/dashboard/lists/LecturersList'
import StudentsList from '../pages/dashboard/lists/StudentsList'
import ModulesList from '../pages/dashboard/lists/ModulesList'
import ClassesList from '../pages/dashboard/lists/ClassesList'
import GroupsList from '../pages/dashboard/lists/GroupsList'
import DegreesList from '../pages/dashboard/lists/DegreesList'
import ExamsList from '../pages/dashboard/lists/ExamsList'
import AssignmentsList from '../pages/dashboard/lists/AssignmentsList'
import EventsList from '../pages/dashboard/lists/EventsList'
import AnnouncementsList from '../pages/dashboard/lists/AnnouncementsList'
import TimeTableList from '../pages/dashboard/lists/TimeTableList'
import RoomBookingsList from '../pages/dashboard/lists/RoomBookingsList'

// Demo Pages
import DemoLayout from '../pages/demo/DemoLayout'
import DemoDashboard from '../pages/demo/DemoDashboard'

// Wrap components that might have errors with ErrorBoundary
const GroupsListWithErrorBoundary = () => (
  <ErrorBoundary>
    <GroupsList />
  </ErrorBoundary>
)

const DegreesListWithErrorBoundary = () => (
  <ErrorBoundary>
    <DegreesList />
  </ErrorBoundary>
)

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'create-account', element: <CreateAccountPage /> },
      { path: 'create-university', element: <CreateUniversityPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'solutions', element: <SolutionsPage /> },
      { path: 'cookies', element: <CookiePreferences /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      { path: 'documentation', element: <Documentation /> },
      { path: 'docs/getting-started', element: <GettingStarted /> },
      { path: 'docs/faq', element: <FAQ /> },
      { path: 'docs/features', element: <Features /> },
      { path: 'docs/api', element: <DocumentationPractices /> },
      { path: '/best-practices', element: <PracticesGuide /> },
      { path: '/docs/tips', element: <ProTips /> },
      { path: '/docs/troubleshooting', element: <TroubleShoot /> },
      { path: '/tutorials', element: <VideoTutorials /> },
      { path: '/forum', element: <CommunityForum /> },
      { path: '/forum/issues', element: <ReportIssues /> },
      { path: '/case-studies', element: <CaseStudies /> },
      { path: '/events', element: <WebinarEvents /> },
      { path: '/integrations', element: <IntegrationGuides /> },
      { path: '/templates', element: <TemplatesLibrary /> },
      { path: '/docs/auth', element: <APIAuthentication /> },
      { path: '/docs/endpoints', element: <APIEndpoints /> },
      { path: '/docs/rate-limits', element: <APIRateLimits /> },
      { path: '/docs/webhooks', element: <APIWebhooks /> },
      { path: '/docs/errors', element: <APIErrors /> },
      { path: '/tech-support', element: <TechSupport /> },
      { path: '/feature-requests', element: <FeatureReq /> },
      { path: '/announcements', element: <Announcements /> },
      { path: '/education', element: <Education /> },
      { path: '/enterprise', element: <Enterprise /> }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardRouter />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'lecturers', element: <LecturersList /> },
      { path: 'students', element: <StudentsList /> },
      { path: 'modules', element: <ModulesList /> },
      { path: 'classes', element: <ClassesList /> },
      { path: 'groups', element: <GroupsListWithErrorBoundary /> },
      { path: 'exams', element: <ExamsList /> },
      { path: 'assignments', element: <AssignmentsList /> },
      { path: 'events', element: <EventsList /> },
      { path: 'announcements', element: <AnnouncementsList /> },
      { path: 'timetable', element: <TimeTableList /> },
      { path: 'bookings', element: <RoomBookingsList /> },
      { path: 'degrees', element: <DegreesListWithErrorBoundary /> }
    ]
  },
  {
    path: '/demo',
    element: <DemoLayout />,
    children: [
      { index: true, element: <DemoDashboard /> },
      { path: 'lecturers', element: <LecturersList /> },
      { path: 'students', element: <StudentsList /> },
      { path: 'modules', element: <ModulesList /> },
      { path: 'classes', element: <ClassesList /> },
      { path: 'groups', element: <GroupsListWithErrorBoundary /> },
      { path: 'degrees', element: <DegreesListWithErrorBoundary /> },
      { path: 'exams', element: <ExamsList /> },
      { path: 'assignments', element: <AssignmentsList /> },
      { path: 'events', element: <EventsList /> },
      { path: 'announcements', element: <AnnouncementsList /> },
      { path: 'timetable', element: <TimeTableList /> }
    ]
  }
]) 
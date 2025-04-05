import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from '../../../config/axios'
import Modal from '../../../components/common/Modal'
import ErrorBoundary from '../../../components/common/ErrorBoundary'
import BaseList from '../../../components/dashboard/BaseList'

interface Module {
  _id: string
  module_code: string
  module_name: string
  level: string
  department: string
  semester: string
  module_status: string
  lectures_per_week: number
  tutorials_per_week: number
  lecture_duration: number
  tutorial_duration: number
  slot_day: string
}

interface Filters {
  searchQuery: string;
  level: string;
  department: string;
  semester: string;
  moduleStatus: string;
}

interface ModuleFormData {
  module_code: string
  module_name: string
  level: string
  department: string
  semester: string
  module_status: string
  lectures_per_week: number
  tutorials_per_week: number
  lecture_duration_hours: number
  lecture_duration_minutes: number
  tutorial_duration_hours: number
  tutorial_duration_minutes: number
  slot_day: string
}

interface ModulesListProps {
  isDemo?: boolean
}

const DAYS_OF_WEEK = ['Any Day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const LEVELS = ['L3', 'L4', 'L5', 'L6', 'L7']
const SEMESTERS = ['1', '2', 'Y']
const MODULE_STATUSES = ['core', 'optional']

function ModulesListContent({ isDemo = false }: ModulesListProps) {
  const navigate = useNavigate()
  const [modules, setModules] = useState<Module[]>([])
  const [filteredModules, setFilteredModules] = useState<Module[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)
  const [formData, setFormData] = useState<ModuleFormData>({
    module_code: '',
    module_name: '',
    level: 'L3',
    department: '',
    semester: '1',
    module_status: 'core',
    lectures_per_week: 0,
    tutorials_per_week: 0,
    lecture_duration_hours: 0,
    lecture_duration_minutes: 0,
    tutorial_duration_hours: 0,
    tutorial_duration_minutes: 0,
    slot_day: 'Any Day'
  })
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [moduleToDelete, setModuleToDelete] = useState<{id: string, code: string} | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState('')
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const [filters, setFilters] = useState<Filters>({
    searchQuery: '',
    level: '',
    department: '',
    semester: '',
    moduleStatus: ''
  })

  const [uniqueDepartments, setUniqueDepartments] = useState<string[]>([])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const user = localStorage.getItem('user')

    if (!token || !user) {
      setIsAuthenticated(false)
      navigate('/login', { state: { returnUrl: '/dashboard/lists/modules' } })
    } else {
      setIsAuthenticated(true)
      fetchModules()
    }
  }, [navigate])

  useEffect(() => {
    if (modules.length > 0) {
      const departments = Array.from(new Set(modules.map(module => module.department)))
      setUniqueDepartments(departments)
    }
  }, [modules])

  useEffect(() => {
    let result = [...modules]

    if (filters.level) {
      result = result.filter(module => module.level === filters.level)
    }

    if (filters.department) {
      result = result.filter(module => module.department === filters.department)
    }

    if (filters.semester) {
      result = result.filter(module => module.semester === filters.semester)
    }

    if (filters.moduleStatus) {
      result = result.filter(module => module.module_status === filters.moduleStatus)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(module =>
          module.module_code.toLowerCase().includes(query) ||
          module.module_name.toLowerCase().includes(query) ||
          module.department.toLowerCase().includes(query)
      )
    }

    setFilteredModules(result)
  }, [modules, filters])

  const fetchModules = async () => {
    try {
      setIsLoading(true)
      console.log('Fetching modules from API...');
      const response = await axios.get('/api/modules/');
      console.log('API Response:', response);

      if (Array.isArray(response.data)) {
        setModules(response.data);
        console.log('Modules loaded:', response.data.length);
      } else {
        console.error('API response is not an array:', response.data);
        setModules([]);
        setError('Invalid data format received from server');
      }
    } catch (err: any) {
      console.error('Error fetching modules:', err);
      console.error('Error details:', err.response || err.message);

      if (err.response?.status === 401) {
        setIsAuthenticated(false);
        navigate('/login', { state: { returnUrl: '/dashboard/lists/modules' } });
      } else if (err.response?.status === 404) {
        console.error('API endpoint not found');
        setError('API endpoint not found. Please check server configuration.');
      } else {
        setError(err.response?.data?.error || err.response?.data?.message || err.message || 'Failed to fetch modules');
      }
      setModules([]);
    } finally {
      setIsLoading(false);
    }
  }

  const validateForm = () => {
    const errors: string[] = []

    if (!formData.module_code.trim()) errors.push('Module code is required')
    if (!formData.module_name.trim()) errors.push('Module name is required')
    if (!formData.department.trim()) errors.push('Department is required')
    if (formData.lectures_per_week < 0) errors.push('Lectures per week cannot be negative')
    if (formData.tutorials_per_week < 0) errors.push('Tutorials per week cannot be negative')
    if (formData.lecture_duration_hours < 0 || formData.lecture_duration_minutes < 0) errors.push('Invalid lecture duration')
    if (formData.tutorial_duration_hours < 0 || formData.tutorial_duration_minutes < 0) errors.push('Invalid tutorial duration')

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDemo) {
      console.log('Form submission disabled in demo mode');
      setIsModalOpen(false);
      return;
    }

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const moduleData = {
        module_code: formData.module_code.trim(),
        module_name: formData.module_name.trim(),
        level: formData.level,
        department: formData.department.trim(),
        semester: formData.semester,
        module_status: formData.module_status,
        lectures_per_week: Number(formData.lectures_per_week),
        tutorials_per_week: Number(formData.tutorials_per_week),
        lecture_duration: (Number(formData.lecture_duration_hours) * 60) + Number(formData.lecture_duration_minutes),
        tutorial_duration: (Number(formData.tutorial_duration_hours) * 60) + Number(formData.tutorial_duration_minutes),
        slot_day: formData.slot_day
      };

      console.log('Submitting module data:', JSON.stringify(moduleData, null, 2));

      let response;
      if (selectedModule?._id) {
        console.log(`Updating module with ID: ${selectedModule._id}`);
        response = await axios.put(`/api/modules/${selectedModule._id}`, moduleData);
      } else {
        console.log('Creating new module');
        response = await axios.post('/api/modules/', moduleData);
      }

      console.log('API Response:', response.data);

      setError(selectedModule ? 'Module updated successfully' : 'Module created successfully');
      setTimeout(() => setError(null), 3000);

      await fetchModules();

      setIsModalOpen(false);
      setSelectedModule(null);
      setFormData({
        module_code: '',
        module_name: '',
        level: 'L3',
        department: '',
        semester: '1',
        module_status: 'core',
        lectures_per_week: 0,
        tutorials_per_week: 0,
        lecture_duration_hours: 0,
        lecture_duration_minutes: 0,
        tutorial_duration_hours: 0,
        tutorial_duration_minutes: 0,
        slot_day: 'Any Day'
      });

    } catch (err: any) {
      console.error('Error saving module:', err);
      console.error('Error details:', err.response || err.message);

      const errorMessage = err.response?.data?.error || err.message || 'Failed to save module';
      if (err.response?.status === 404) {
        setError('API endpoint not found. Please check server configuration.');
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleEdit = (module: Module) => {
    const lectureDurationHours = Math.floor(module.lecture_duration / 60)
    const lectureDurationMinutes = module.lecture_duration % 60
    const tutorialDurationHours = Math.floor(module.tutorial_duration / 60)
    const tutorialDurationMinutes = module.tutorial_duration % 60

    setSelectedModule(module)
    setFormData({
      module_code: module.module_code,
      module_name: module.module_name,
      level: module.level,
      department: module.department,
      semester: module.semester,
      module_status: module.module_status,
      lectures_per_week: module.lectures_per_week,
      tutorials_per_week: module.tutorials_per_week,
      lecture_duration_hours: lectureDurationHours,
      lecture_duration_minutes: lectureDurationMinutes,
      tutorial_duration_hours: tutorialDurationHours,
      tutorial_duration_minutes: tutorialDurationMinutes,
      slot_day: module.slot_day || 'Any Day'
    })
    setIsModalOpen(true)
  }

  const handleDeleteClick = (id: string, code: string) => {
    setModuleToDelete({ id, code })
    setDeleteConfirmation('')
    setDeleteError(null)
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (deleteConfirmation.toLowerCase() !== 'delete') {
      setDeleteError('Please type "delete" to confirm');
      return;
    }

    if (!moduleToDelete) return;

    try {
      setIsLoading(true);
      setDeleteError(null);
      console.log(`Deleting module with ID: ${moduleToDelete.id}`);
      await axios.delete(`/api/modules/${moduleToDelete.id}`);

      setIsDeleteModalOpen(false);
      setModuleToDelete(null);
      setDeleteConfirmation('');

      setError('Module deleted successfully');
      setTimeout(() => setError(null), 3000);

      await fetchModules();
    } catch (err: any) {
      console.error('Error deleting module:', err);
      console.error('Error details:', err.response || err.message);

      const errorMessage = err.response?.data?.error || err.message || 'Failed to delete module';
      if (err.response?.status === 404) {
        setDeleteError('Module not found or API endpoint not found. Please check server configuration.');
      } else {
        setDeleteError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filterName: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      level: '',
      department: '',
      semester: '',
      moduleStatus: ''
    })
  }

  return (
      <>
        <BaseList
            title="Modules"
            createButtonLabel="Add Module"
            onCreateClick={() => {
              setSelectedModule(null)
              setFormData({
                module_code: '',
                module_name: '',
                level: 'L3',
                department: '',
                semester: '1',
                module_status: 'core',
                lectures_per_week: 0,
                tutorials_per_week: 0,
                lecture_duration_hours: 0,
                lecture_duration_minutes: 0,
                tutorial_duration_hours: 0,
                tutorial_duration_minutes: 0,
                slot_day: 'Any Day'
              })
              setIsModalOpen(true)
            }}
        >
          {error && (
              <div className={`p-4 mb-4 rounded-md ${
                  error.toLowerCase().includes('success')
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200'
              }`}>
                {error}
              </div>
          )}

          <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Search
                </label>
                <input
                    type="text"
                    id="search"
                    value={filters.searchQuery}
                    onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                    placeholder="Search by code, name, or department"
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                />
              </div>

              <div>
                <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Level
                </label>
                <select
                    id="level"
                    value={filters.level}
                    onChange={(e) => handleFilterChange('level', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Levels</option>
                  {LEVELS.map(level => (
                      <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Department
                </label>
                <select
                    id="department"
                    value={filters.department}
                    onChange={(e) => handleFilterChange('department', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Departments</option>
                  {uniqueDepartments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Semester
                </label>
                <select
                    id="semester"
                    value={filters.semester}
                    onChange={(e) => handleFilterChange('semester', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Semesters</option>
                  {SEMESTERS.map(semester => (
                      <option key={semester} value={semester}>{semester}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="moduleStatus" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                    id="moduleStatus"
                    value={filters.moduleStatus}
                    onChange={(e) => handleFilterChange('moduleStatus', e.target.value)}
                    className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm h-10 px-3"
                >
                  <option value="">All Statuses</option>
                  {MODULE_STATUSES.map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredModules.length} of {modules.length} modules
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Module Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Module Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Semester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredModules.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                      {isLoading ? (
                          <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                          </div>
                      ) : (
                          'No modules found matching the filters. Click "Add Module" to create one.'
                      )}
                    </td>
                  </tr>
              ) : (
                  filteredModules.map((module) => (
                      <motion.tr
                          key={module._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {module.module_code}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {module.module_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {module.level}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {module.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {module.semester}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          module.module_status === 'core'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {module.module_status.charAt(0).toUpperCase() + module.module_status.slice(1)}
                      </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                              onClick={() => handleEdit(module)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                          >
                            Edit
                          </button>
                          <button
                              onClick={() => handleDeleteClick(module._id, module.module_code)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                  ))
              )}
              </tbody>
            </table>
          </div>
        </BaseList>

        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={selectedModule ? "Edit Module" : "Add Module"}
            width="wide"
        >
          <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
            {error && (
                <div className={`p-4 mb-4 rounded-md ${
                    error.toLowerCase().includes('success')
                        ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-200'
                        : 'bg-red-50 text-red-800 dark:bg-red-900/50 dark:text-red-200'
                }`}>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-200">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
            )}

            <div className="relative pb-3">
              <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-4">
                {selectedModule ? "Update module information" : "Enter module details"}
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Please fill in all the required fields marked with an asterisk (*).
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="relative pb-3 mb-4">
                <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
                  Basic Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2">
                  <label htmlFor="module_code" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Module Code <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="module_code"
                      name="module_code"
                      required
                      value={formData.module_code}
                      onChange={(e) => setFormData({ ...formData, module_code: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="e.g., CS101"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="module_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Module Name <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="module_name"
                      name="module_name"
                      required
                      value={formData.module_name}
                      onChange={(e) => setFormData({ ...formData, module_name: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="e.g., Introduction to Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="text"
                      id="department"
                      name="department"
                      required
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="level"
                      name="level"
                      required
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {LEVELS.map((level) => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="semester"
                      name="semester"
                      required
                      value={formData.semester}
                      onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {SEMESTERS.map((semester) => (
                        <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="module_status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Module Status <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="module_status"
                      name="module_status"
                      required
                      value={formData.module_status}
                      onChange={(e) => setFormData({ ...formData, module_status: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {MODULE_STATUSES.map((status) => (
                        <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
              <div className="relative pb-3 mb-4">
                <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
                <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
                  Schedule Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                <div className="space-y-2">
                  <label htmlFor="lectures_per_week" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Lectures per Week <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="number"
                      id="lectures_per_week"
                      name="lectures_per_week"
                      min="0"
                      max="10"
                      required
                      value={formData.lectures_per_week}
                      onChange={(e) => setFormData({ ...formData, lectures_per_week: parseInt(e.target.value) || 0 })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="tutorials_per_week" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tutorials per Week <span className="text-red-500">*</span>
                  </label>
                  <input
                      type="number"
                      id="tutorials_per_week"
                      name="tutorials_per_week"
                      min="0"
                      max="10"
                      required
                      value={formData.tutorials_per_week}
                      onChange={(e) => setFormData({ ...formData, tutorials_per_week: parseInt(e.target.value) || 0 })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lecture_duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Lecture Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                          type="number"
                          id="lecture_duration_hours"
                          name="lecture_duration_hours"
                          min="0"
                          max="12"
                          required
                          value={formData.lecture_duration_hours}
                          onChange={(e) => setFormData({ ...formData, lecture_duration_hours: parseInt(e.target.value) || 0 })}
                          className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">hrs</span>
                    </div>
                    <div className="flex items-center">
                      <input
                          type="number"
                          id="lecture_duration_minutes"
                          name="lecture_duration_minutes"
                          min="0"
                          max="59"
                          required
                          value={formData.lecture_duration_minutes}
                          onChange={(e) => setFormData({ ...formData, lecture_duration_minutes: parseInt(e.target.value) || 0 })}
                          className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">min</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="tutorial_duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Tutorial Duration <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                          type="number"
                          id="tutorial_duration_hours"
                          name="tutorial_duration_hours"
                          min="0"
                          max="12"
                          required
                          value={formData.tutorial_duration_hours}
                          onChange={(e) => setFormData({ ...formData, tutorial_duration_hours: parseInt(e.target.value) || 0 })}
                          className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">hrs</span>
                    </div>
                    <div className="flex items-center">
                      <input
                          type="number"
                          id="tutorial_duration_minutes"
                          name="tutorial_duration_minutes"
                          min="0"
                          max="59"
                          required
                          value={formData.tutorial_duration_minutes}
                          onChange={(e) => setFormData({ ...formData, tutorial_duration_minutes: parseInt(e.target.value) || 0 })}
                          className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                      />
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">min</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="slot_day" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Preferred Slot Day <span className="text-red-500">*</span>
                  </label>
                  <select
                      id="slot_day"
                      name="slot_day"
                      required
                      value={formData.slot_day}
                      onChange={(e) => setFormData({ ...formData, slot_day: e.target.value })}
                      className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="">Select a day</option>
                    {DAYS_OF_WEEK.map((day) => (
                        <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
              <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  disabled={isLoading}
              >
                Cancel
              </button>
              <button
                  type="submit"
                  className="px-5 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
              >
                {isLoading ? (
                    <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                      {selectedModule ? 'Updating...' : 'Adding...'}
                </span>
                ) : (
                    selectedModule ? 'Update Module' : 'Add Module'
                )}
              </button>
            </div>
          </form>
        </Modal>

        <Modal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            title="Confirm Deletion"
            width="default"
        >
          <div className="p-6 space-y-6">
            {deleteError && (
                <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 dark:text-red-200">
                        {deleteError}
                      </p>
                    </div>
                  </div>
                </div>
            )}

            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>

              <h3 className="mt-5 text-lg font-medium text-gray-900 dark:text-white">
                Delete Module
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete module <span className="font-semibold">{moduleToDelete?.code}</span>? This action cannot be undone.
              </p>

              <div className="mt-6">
                <label htmlFor="delete-confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-left mb-2">
                  Type "delete" to confirm:
                </label>
                <input
                    type="text"
                    id="delete-confirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
                    placeholder="Type 'delete' to confirm"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  disabled={isLoading || deleteConfirmation.toLowerCase() !== 'delete'}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                    <span className="flex items-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Deleting...
                </span>
                ) : (
                    'Delete Module'
                )}
              </button>
            </div>
          </div>
        </Modal>
      </>
  )
}

export default function ModulesList(props: ModulesListProps) {
  return (
      <ErrorBoundary>
        <ModulesListContent {...props} />
      </ErrorBoundary>
  )
}
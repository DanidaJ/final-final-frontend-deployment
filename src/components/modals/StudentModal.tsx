import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { Student } from '../../types/student';
import { Degree } from '../../types/degree';
import axios from 'axios';

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Student, '_id' | 'created_at' | 'updated_at'> & { optional_modules: string[] }) => void;
  initialData?: Student | null;
  title: string;
}

export default function StudentModal({ isOpen, onClose, onSubmit, initialData, title }: StudentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [modules, setModules] = useState<any[]>([]);
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    iit_id: '',
    level: '',
    intake: '',
    group: '',
    degree_name: '',
    study_mode: 'Full-time' as 'Full-time' | 'Part-time',
    contact_number: '',
    optional_modules: [] as string[]
  });

  useEffect(() => {
    fetchDegrees();
    fetchModules();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        email: initialData.email,
        iit_id: initialData.iit_id,
        level: initialData.level,
        intake: initialData.intake,
        group: initialData.group || '',
        degree_name: initialData.degree_name,
        study_mode: initialData.study_mode,
        contact_number: initialData.contact_number,
        optional_modules: initialData.optional_modules || []
      });
      // Find and set the selected degree
      const degree = degrees.find(d => d.name === initialData.degree_name);
      if (degree) {
        setSelectedDegree(degree);
      }
    } else {
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        iit_id: '',
        level: '',
        intake: '',
        group: '',
        degree_name: '',
        study_mode: 'Full-time',
        contact_number: '',
        optional_modules: []
      });
      setSelectedDegree(null);
    }
  }, [initialData, degrees]);

  const fetchDegrees = async () => {
    try {
      const response = await axios.get('/api/degrees');
      if (Array.isArray(response.data)) {
        setDegrees(response.data);
      }
    } catch (err) {
      console.error('Error fetching degrees:', err);
      setError('Failed to load degrees');
    }
  };

  const fetchModules = async () => {
    try {
      const response = await axios.get('/api/modules');
      if (Array.isArray(response.data)) {
        setModules(response.data);
      }
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError('Failed to load modules');
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.first_name.trim()) errors.push('First name is required');
    if (!formData.last_name.trim()) errors.push('Last name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!formData.iit_id.trim()) errors.push('IIT ID is required');
    if (!formData.level) errors.push('Level is required');
    if (!formData.intake.trim()) errors.push('Intake is required');
    if (!formData.degree_name.trim()) errors.push('Degree name is required');
    if (!formData.contact_number.trim()) errors.push('Contact number is required');
    
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.message || 'Failed to save student';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleDegreeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const degreeName = e.target.value;
    const degree = degrees.find(d => d.name === degreeName);
    setSelectedDegree(degree || null);
    setFormData(prev => ({
      ...prev,
      degree_name: degreeName,
      level: '', // Reset level when degree changes
      optional_modules: [] // Reset optional modules when degree changes
    }));
  };

  const getAvailableModules = () => {
    if (!selectedDegree || !formData.level) return [];
    return modules.filter(module => 
      selectedDegree.modules?.includes(module._id) && 
      module.level === formData.level &&
      module.module_status === 'optional'
    );
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      width="wide"
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto px-1">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-md p-4">
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
            {initialData ? "Update student information" : "Enter student details"}
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Please fill in all the required fields marked with an asterisk (*).
          </p>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Basic Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-2">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="iit_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                IIT ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="iit_id"
                name="iit_id"
                required
                value={formData.iit_id}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact_number"
                name="contact_number"
                required
                value={formData.contact_number}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">Academic Information</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <div className="space-y-2">
              <label htmlFor="degree_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Degree <span className="text-red-500">*</span>
              </label>
              <select
                id="degree_name"
                name="degree_name"
                required
                value={formData.degree_name}
                onChange={handleDegreeChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Select Degree</option>
                {degrees.map(degree => (
                  <option key={degree._id} value={degree.name}>
                    {degree.name}
                  </option>
                ))}
              </select>
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
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="">Select Level</option>
                {selectedDegree && (
                  <>
                    <option value="L3">L3</option>
                    <option value="L4">L4</option>
                    <option value="L5">L5</option>
                    <option value="L6">L6</option>
                    <option value="L7">L7</option>
                  </>
                )}
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="intake" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Intake <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="intake"
                name="intake"
                required
                value={formData.intake}
                onChange={handleChange}
                placeholder="e.g., Fall 2024"
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="study_mode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Study Mode <span className="text-red-500">*</span>
              </label>
              <select
                id="study_mode"
                name="study_mode"
                required
                value={formData.study_mode}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="group" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Group
              </label>
              <input
                type="text"
                id="group"
                name="group"
                value={formData.group}
                onChange={handleChange}
                className="block w-full h-10 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 dark:bg-gray-700 dark:text-white text-sm"
              />
            </div>
          </div>
        </div>

        {selectedDegree && formData.level && (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-lg border border-gray-100 dark:border-gray-700">
            <div className="relative pb-3 mb-4">
              <div className="absolute top-0 left-0 w-16 h-1 bg-blue-600 dark:bg-blue-500 rounded-full"></div>
              <h3 className="text-md font-medium text-gray-900 dark:text-white mt-4">
                Optional Modules
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select the optional modules for this level
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="max-h-60 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-md p-3">
                {getAvailableModules().length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400 py-2 text-center">
                    No optional modules available for this level.
                  </p>
                ) : (
                  getAvailableModules().map((module) => (
                    <div key={module._id} className="flex items-center space-x-3 py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                      <input
                        type="checkbox"
                        id={`module-${module._id}`}
                        checked={formData.optional_modules.includes(module._id)}
                        onChange={(e) => {
                          const updatedModules = e.target.checked
                            ? [...formData.optional_modules, module._id]
                            : formData.optional_modules.filter(id => id !== module._id);
                          setFormData(prev => ({ ...prev, optional_modules: updatedModules }));
                        }}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`module-${module._id}`}
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {module.module_code} - {module.module_name}
                      </label>
                    </div>
                  ))
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Selected optional modules: {formData.optional_modules.length}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-5 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 pb-2">
          <button
            type="button"
            onClick={onClose}
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
                {initialData ? 'Updating...' : 'Adding...'}
              </span>
            ) : (
              initialData ? 'Update Student' : 'Add Student'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
} 
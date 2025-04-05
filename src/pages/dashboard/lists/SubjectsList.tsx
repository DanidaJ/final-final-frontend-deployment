import { useState } from 'react'
import { motion } from 'framer-motion'
import BaseList from '../../../components/dashboard/BaseList'
import Modal from '../../../components/common/Modal'

interface Module {
  id: number
  code: string
  name: string
  department: string
  credits: number
  status: 'active' | 'inactive'
}

const mockModules: Module[] = [
  {
    id: 1,
    code: 'MATH101',
    name: 'Introduction to Mathematics',
    department: 'Mathematics',
    credits: 3,
    status: 'active'
  },
  {
    id: 2,
    code: 'PHY201',
    name: 'Physics Fundamentals',
    department: 'Physics',
    credits: 4,
    status: 'active'
  },
  // Add more mock data
]

export default function ModulesList() {
  const [modules] = useState<Module[]>(mockModules)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedModule, setSelectedModule] = useState<Module | null>(null)

  return (
    <>
      <BaseList
        title="Modules"
        createButtonLabel="Add Module"
        onCreateClick={() => setShowCreateModal(true)}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {modules.map((module) => (
                <motion.tr
                  key={module.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {module.code}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {module.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {module.department}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {module.credits}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      module.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {module.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => setSelectedModule(module)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
                    >
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                      Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </BaseList>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showCreateModal || !!selectedModule}
        onClose={() => {
          setShowCreateModal(false)
          setSelectedModule(null)
        }}
        title={selectedModule ? 'Edit Module' : 'Add Module'}
      >
        <ModuleForm
          module={selectedModule}
          onSubmit={(data) => {
            console.log('Form submitted:', data)
            setShowCreateModal(false)
            setSelectedModule(null)
          }}
          onCancel={() => {
            setShowCreateModal(false)
            setSelectedModule(null)
          }}
        />
      </Modal>
    </>
  )
}

interface ModuleFormProps {
  module?: Module | null
  onSubmit: (data: Partial<Module>) => void
  onCancel: () => void
}

function ModuleForm({ module, onSubmit, onCancel }: ModuleFormProps) {
  const [formData, setFormData] = useState({
    code: module?.code || '',
    name: module?.name || '',
    department: module?.department || '',
    credits: module?.credits || 3,
    status: module?.status || 'active'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Module Code
        </label>
        <input
          type="text"
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Module Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Department
        </label>
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select Department</option>
          <option value="Mathematics">Mathematics</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="Computer Science">Computer Science</option>
          <option value="English">English</option>
          <option value="History">History</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Credits
        </label>
        <input
          type="number"
          min="1"
          max="6"
          value={formData.credits}
          onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="active"
              checked={formData.status === 'active'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="inactive"
              checked={formData.status === 'inactive'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-gray-700 dark:text-gray-300">Inactive</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
        >
          {module ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  )
} 
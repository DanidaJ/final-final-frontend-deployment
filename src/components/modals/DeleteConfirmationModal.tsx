import React, { ReactNode } from 'react'
import Modal from '../common/Modal'
import LoadingSpinner from '../common/LoadingSpinner'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  children: ReactNode
  confirmText: string
  setConfirmText: (text: string) => void
  isLoading?: boolean
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  children,
  confirmText,
  setConfirmText,
  isLoading = false
}) => {
  const isConfirmEnabled = confirmText === 'delete'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {children}
          </div>
        </div>
        
        <div className="mt-4">
          <label htmlFor="confirm-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirmation
          </label>
          <input
            type="text"
            id="confirm-text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:text-white text-sm"
            placeholder="Type 'delete' to confirm"
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-offset-gray-800"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 ${
              !isConfirmEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
            }`}
            disabled={!isConfirmEnabled || isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <LoadingSpinner size="small" className="mr-2" />
                Deleting...
              </span>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteConfirmationModal 
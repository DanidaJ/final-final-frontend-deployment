import React from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  width?: 'default' | 'wide' | 'narrow'
}

export default function Modal({ isOpen, onClose, title, children, width = 'default' }: ModalProps) {
  if (!isOpen) return null

  const getWidthClass = () => {
    switch (width) {
      case 'wide':
        return 'sm:max-w-4xl'
      case 'narrow':
        return 'sm:max-w-md'
      default:
        return 'sm:max-w-2xl'
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-800 dark:bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:p-6 sm:align-middle relative">
          <div className={`mx-auto ${getWidthClass()}`}>
            {/* Close button */}
            <div className="absolute right-4 top-4">
              <button
                type="button"
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <div className="mb-4">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>

            {/* Content */}
            <div className="mt-2">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
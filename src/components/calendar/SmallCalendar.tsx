import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'

interface SmallCalendarProps {
  currentDate: Date
  onDateSelect?: (date: Date) => void
}

export default function SmallCalendar({ currentDate, onDateSelect }: SmallCalendarProps) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
        </div>
        
        {/* Week days */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div
              key={day}
              className="text-center text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: monthStart.getDay() }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8" />
          ))}
          
          {daysInMonth.map(date => {
            const isCurrentMonth = isSameMonth(date, currentDate)
            const isCurrentDay = isToday(date)
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => onDateSelect?.(date)}
                className={`
                  h-8 flex items-center justify-center rounded-full text-sm
                  ${isCurrentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}
                  ${isCurrentDay ? 'bg-blue-600 text-white hover:bg-blue-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
                `}
              >
                {format(date, 'd')}
              </button>
            )
          })}
        </div>

        {/* Events indicator */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-xs">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            <span className="text-gray-600 dark:text-gray-300">Classes</span>
          </div>
          <div className="flex items-center text-xs">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-600 dark:text-gray-300">Assignments</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
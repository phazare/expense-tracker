import { DatePicker } from 'react-datepicker'
function DateInput({ selectedDate, setSelectedDate }) {

    return <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        maxDate={new Date()}
        dateFormat="MM/dd/yyyy"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholderText="Select date"
    />
}

export default DateInput
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function MonthOptions() {
  return months.map((month, index) => (
    <option key={index} value={index + 1}>
      {month}
    </option>
  ));
}

export function YearOptions({
  startYear = new Date().getFullYear(),
  endYear = 1900,
}) {
  const years = [];
  for (let year = startYear; year >= endYear; year--) {
    years.push(year);
  }

  return years.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));
}

export function DayOptions({ month, year }) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = [];
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days.map((day) => (
    <option key={day} value={day}>
      {day}
    </option>
  ));
}

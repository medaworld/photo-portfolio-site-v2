import { useState } from 'react';
import { styled } from 'styled-components';

const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  select option {
    max-height: 30px;
  }
`;

const DateLabel = styled.span`
  margin-right: 10px;
`;

function MonthOptions() {
  const months = [
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

  return months.map((month, index) => (
    <option key={index} value={index + 1}>
      {month}
    </option>
  ));
}

function YearOptions({ startYear = new Date().getFullYear(), endYear = 1900 }) {
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

function DayOptions({ month, year }) {
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

export default function DateInput() {
  const [selectedTakenMonth, setSelectedTakenMonth] = useState('');
  const [selectedTakenYear, setSelectedTakenYear] = useState('');
  const [selectedTakenDay, setSelectedTakenDay] = useState('');

  const handleMonthChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedTakenMonth(value);
  };

  const handleYearChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedTakenYear(value);
  };

  const handleDayChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedTakenDay(value);
  };

  return (
    <DateContainer>
      <select
        name="year"
        data-type="taken"
        value={selectedTakenYear}
        onChange={handleYearChange}
        placeholder="Please select year"
      >
        <option value="" disabled hidden>
          Year
        </option>
        <YearOptions />
      </select>
      <select
        name="month"
        data-type="taken"
        value={selectedTakenMonth}
        onChange={handleMonthChange}
      >
        <option value="" disabled hidden>
          Month
        </option>
        <MonthOptions />
      </select>
      <select
        name="day"
        data-type="taken"
        value={selectedTakenDay}
        onChange={handleDayChange}
      >
        <option value="" disabled hidden>
          Day
        </option>
        <DayOptions month={selectedTakenMonth} year={selectedTakenYear} />
      </select>
    </DateContainer>
  );
}

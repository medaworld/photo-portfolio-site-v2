import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { DayOptions, MonthOptions, YearOptions } from '../../utils/dateUtils';

const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const DateSelect = styled.select`
  background-color: white;
  color: black;
  border: none;
  font-family: 'Open sans';
`;

export default function DateInput({ setSelectedDate }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const newDate = new Date(
        `${selectedYear}, ${selectedMonth}, ${selectedDay}`
      );
      setSelectedDate(newDate);
    }
  }, [selectedDay, selectedMonth, selectedYear, setSelectedDate]);

  const handleMonthChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedMonth(value);
  };

  const handleYearChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedYear(value);
  };

  const handleDayChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedDay(value);
  };

  return (
    <DateContainer>
      <DateSelect
        name="year"
        value={selectedYear}
        onChange={handleYearChange}
        placeholder="Please select year"
      >
        <option value="" disabled hidden>
          Year
        </option>
        <YearOptions />
      </DateSelect>
      <DateSelect
        name="month"
        value={selectedMonth}
        onChange={handleMonthChange}
      >
        <option value="" disabled hidden>
          Month
        </option>
        <MonthOptions />
      </DateSelect>
      <DateSelect name="day" value={selectedDay} onChange={handleDayChange}>
        <option value="" disabled hidden>
          Day
        </option>
        <DayOptions month={selectedMonth} year={selectedYear} />
      </DateSelect>
    </DateContainer>
  );
}

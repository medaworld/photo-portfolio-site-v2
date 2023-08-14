import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { DayOptions, MonthOptions, YearOptions } from '../../utils/dateUtils';

const DateContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  select option {
    max-height: 30px;
  }
`;

export default function DateInput({ setSelectedDate }) {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDay, setSelectedDay] = useState('');

  const handleMonthChange = (event: any) => {
    const type = event.target.getAttribute('data-type');
    const value = event.target.value;
    setSelectedMonth(value);
    setSelectedDate(new Date());
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

  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      setSelectedDate(
        new Date(`${selectedMonth} ${selectedDay}, ${selectedYear}`)
      );
    }
  }, [selectedDay, selectedMonth, selectedYear, setSelectedDate]);

  return (
    <DateContainer>
      <select
        name="year"
        value={selectedYear}
        onChange={handleYearChange}
        placeholder="Please select year"
      >
        <option value="" disabled hidden>
          Year
        </option>
        <YearOptions />
      </select>
      <select name="month" value={selectedMonth} onChange={handleMonthChange}>
        <option value="" disabled hidden>
          Month
        </option>
        <MonthOptions />
      </select>
      <select name="day" value={selectedDay} onChange={handleDayChange}>
        <option value="" disabled hidden>
          Day
        </option>
        <DayOptions month={selectedMonth} year={selectedYear} />
      </select>
    </DateContainer>
  );
}

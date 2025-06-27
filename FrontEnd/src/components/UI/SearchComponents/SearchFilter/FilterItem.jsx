import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./SearchFilter.module.css";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";

function FilterItem({ text, options, selectedValue, onSelect, renderOption }) {
  const isStart = text === "Start Date";
  const isEnd = text === "End Date";
  const isDate = isStart || isEnd;

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleSelectOption = (option) => {
    const isReset = option === text;
    const newValue = isReset ? "" : option;
    if (onSelect) onSelect(newValue);
    setIsOpen(false);
  };

  const handleDateChange = (date) => {
    const formatted = date.format("YYYY-MM-DD");

    if (isStart) {
      setStartDate(date);
      if (endDate && dayjs(endDate).isBefore(date)) {
        setEndDate(null);
      }
    } else {
      setEndDate(date);
    }

    if (onSelect) onSelect(formatted);
    setIsOpen(false);
  };

  const minDate = isEnd && startDate ? startDate : undefined;
  const value = isStart ? startDate : endDate;
  const displayText = selectedValue || text;
  const isSelected = selectedValue && selectedValue !== text;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className={`${styles.filterWrapper} ${
          isSelected ? styles.selectedFilter : ""
        }`}
      >
        <div className={styles.filter_item} onClick={() => setIsOpen(!isOpen)}>
          {renderOption && selectedValue ? (
            renderOption(selectedValue)
          ) : (
            <span>{displayText}</span>
          )}
          <span className={styles.filterIcon}>
            <FaChevronDown />
          </span>
        </div>

        {isOpen && (
          <>
            <div className={styles.overlay} onClick={() => setIsOpen(false)} />
            <div className={styles.dropdown}>
              {isDate ? (
                <>
                  <StaticDatePicker
                    value={value}
                    onChange={handleDateChange}
                    minDate={minDate}
                    displayStaticWrapperAs="desktop"
                    disablePast={false}
                    slotProps={{ actionBar: { actions: [] } }}
                  />
                  <div className={styles.dateActions}>
                    <button
                      onClick={() => {
                        setStartDate(null);
                        setEndDate(null);
                        if (onSelect) onSelect("");
                        setIsOpen(false);
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </>
              ) : (
                (options || []).map((option, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectOption(option)}
                  >
                    {renderOption ? renderOption(option) : option}
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </LocalizationProvider>
  );
}

FilterItem.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.array,
  selectedValue: PropTypes.string,
  onSelect: PropTypes.func,
  renderOption: PropTypes.func,
};

export default FilterItem;

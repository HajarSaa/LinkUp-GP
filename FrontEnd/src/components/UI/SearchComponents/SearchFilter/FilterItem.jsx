import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import styles from "./SearchFilter.module.css";
import PropTypes from "prop-types";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const menuOptions = {
  All: ["All", "Channels", "Conversations"],
  From: ["Ahmed Aymanaaaaaaaaaaaaaششششششششششششششa", "Alaa AbdullKhaleq"],
};

function FilterItem({ text }) {
  const isStart = text === "Start Date";
  const isEnd = text === "End Date";
  const isDate = isStart || isEnd;

  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectOption = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
    console.log(`Selected "${option}" from "${text}" filter`);
  };

  const handleDateChange = (date) => {
    if (isStart) {
      setStartDate(date);
      if (endDate && dayjs(endDate).isBefore(date)) {
        setEndDate(null);
      }
    } else {
      setEndDate(date);
    }

    setSelectedValue(date.format("YYYY-MM-DD"));
    setIsOpen(false);
    console.log(`${text} picked: ${date.format("YYYY-MM-DD")}`);
  };

  const minDate = isEnd && startDate ? startDate : undefined;
  const value = isStart ? startDate : endDate;
  const displayText = selectedValue || text;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.filterWrapper}>
        <div className={styles.filter_item} onClick={() => setIsOpen(!isOpen)}>
          <span>{displayText}</span>
          <span className={styles.filterIcon}>
            <FaChevronDown />
          </span>
        </div>

        {isOpen && (
          <>
            <div className={styles.overlay} onClick={() => setIsOpen(false)} />
            <div className={styles.dropdown}>
              {isDate ? (
                <StaticDatePicker
                  value={value}
                  onChange={handleDateChange}
                  minDate={minDate}
                  displayStaticWrapperAs="desktop"
                  disablePast={false}
                  shouldDisableDate={(date) =>
                    isEnd && startDate && dayjs(date).isBefore(startDate, "day")
                  }
                  slotProps={{
                    actionBar: {
                      actions: [], // ✅ دي اللي بتشيل الأزرار
                    },
                  }}
                />
              ) : (
                menuOptions[text]?.map((option, idx) => (
                  <div
                    key={idx}
                    className={styles.dropdownItem}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option}
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
};

export default FilterItem;

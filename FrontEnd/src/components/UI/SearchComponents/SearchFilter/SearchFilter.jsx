import styles from "./SearchFilter.module.css";
import FilterItem from "./FilterItem";
import { useEffect, useState, useMemo } from "react";

// خريطة الأسماء لـ IDs
const channelMap = {
  "#general": "68594bb06a8f7e74bf320f2f",
  "#dev": "68594bb06a8f7e74bf320f30",
  "#design": "68594bb06a8f7e74bf320f31",
};

const conversMap = {
  Alaa: "6856979dcb47ffae89eecc8d",
  Ahmed: "6856979dcb47ffae89eecc8e",
  Youssef: "6856979dcb47ffae89eecc8f",
};

const userMap = {
  Ahmed: "68594a066a8f7e74bf320e74",
  Alaa: "68594a066a8f7e74bf320e75",
};

function SearchFilter() {
  const [allType, setAllType] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedConvers, setSelectedConvers] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forceReset, setForceReset] = useState(false); // ⬅️ فلاغ جديد

  const channelsList = useMemo(() => ["#general", "#dev", "#design"], []);
  const conversList = useMemo(() => ["Alaa", "Ahmed", "Youssef"], []);
  const fromList = useMemo(() => ["From", "Ahmed", "Alaa"], []);

  // لما النوع يتغير (All / Channels / Conversations)
  useEffect(() => {
    if (allType === "Channels") {
      setSelectedChannel(channelsList[0]);
      setSelectedConvers("");
    } else if (allType === "Conversations") {
      setSelectedConvers(conversList[0]);
      setSelectedChannel("");
    } else {
      setSelectedChannel("");
      setSelectedConvers("");
    }
  }, [allType, channelsList, conversList]);

  // Reset إجباري لما forceReset يتغير
  useEffect(() => {
    if (forceReset) {
      setSelectedChannel("");
      setSelectedConvers("");
      setSelectedFrom("");
      setStartDate("");
      setEndDate("");
      setForceReset(false); // نرجعه False تاني
    }
  }, [forceReset]);

  // تكوين رابط الكويري
  useEffect(() => {
    const queryParams = {};

    if (allType === "Channels" && selectedChannel) {
      queryParams.channel = channelMap[selectedChannel];
    }

    if (allType === "Conversations" && selectedConvers) {
      queryParams.conversation = conversMap[selectedConvers];
    }

    if (selectedFrom && selectedFrom !== "From") {
      queryParams.user = userMap[selectedFrom];
    }

    if (startDate) {
      queryParams.startDate = startDate;
    }

    if (endDate) {
      queryParams.endDate = endDate;
    }

    const searchParams = new URLSearchParams(queryParams).toString();
    const fullURL = `http://localhost:3000/search?${searchParams}`;

    console.log("🌐 Full URL:", fullURL);
  }, [
    allType,
    selectedChannel,
    selectedConvers,
    selectedFrom,
    startDate,
    endDate,
  ]);

  return (
    <div className={styles.filters}>
      <FilterItem
        text="All"
        selectedValue={allType}
        onSelect={(val) => {
          if (val === allType && val === "All") {
            setForceReset(true);
          }
          setAllType(val);
        }}
        options={["All", "Channels", "Conversations"]}
      />

      {allType === "Channels" && selectedChannel && (
        <FilterItem
          text="Channel"
          selectedValue={selectedChannel}
          onSelect={setSelectedChannel}
          options={channelsList}
        />
      )}

      {allType === "Conversations" && selectedConvers && (
        <FilterItem
          text="Conversation"
          selectedValue={selectedConvers}
          onSelect={setSelectedConvers}
          options={conversList}
        />
      )}

      <FilterItem
        text="From"
        options={fromList}
        selectedValue={selectedFrom}
        onSelect={setSelectedFrom}
      />

      <FilterItem
        text="Start Date"
        selectedValue={startDate}
        onSelect={setStartDate}
      />

      <FilterItem
        text="End Date"
        selectedValue={endDate}
        onSelect={setEndDate}
      />
    </div>
  );
}

export default SearchFilter;

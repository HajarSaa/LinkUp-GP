import styles from "./SearchFilter.module.css";
import FilterItem from "./FilterItem";
import { useEffect, useState } from "react";
import { useMemo } from "react";

function SearchFilter() {
  const [allType, setAllType] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedConvers, setSelectedConvers] = useState("");

  const channelsList = useMemo(() => ["#general", "#dev", "#design"], []);
  const conversList = useMemo(() => ["Alaa", "Ahmed", "Youssef"], []);

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

  return (
    <div className={styles.filters}>
      <FilterItem
        text="All"
        selectedValue={allType}
        onSelect={setAllType}
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

      <FilterItem text="From" options={["From", "Ahmed", "Alaa"]} />
      <FilterItem text="Start Date" />
      <FilterItem text="End Date" />
    </div>
  );
}

export default SearchFilter;

/* eslint-disable react/prop-types */
import styles from "./SearchFilter.module.css";
import FilterItem from "./FilterItem";
import { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import useGetSidebarConvers from "../../../../API/hooks/conversation/useGetSidebarConvers";

function SearchFilter({ onFiltersChange }) {
  const [allType, setAllType] = useState("All");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedConvers, setSelectedConvers] = useState("");
  const [selectedFrom, setSelectedFrom] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [forceReset, setForceReset] = useState(false);

  const { workspace } = useSelector((state) => state.workspace);
  const channels = workspace?.channels;
  const conversations = useGetSidebarConvers(workspace);

  // --- Channels ---
  const channelsList = useMemo(() => {
    if (!channels) return [];
    return channels.map((channel) => ({
      label: `#${channel.name} (${channel.type})`,
      value: `#${channel.name}`,
      id: channel._id,
    }));
  }, [channels]);

  const channelMap = useMemo(() => {
    if (!channels) return {};
    return channels.reduce((acc, channel) => {
      acc[`#${channel.name}`] = channel._id;
      return acc;
    }, {});
  }, [channels]);

  const channelNames = useMemo(
    () => channelsList.map((c) => c.value),
    [channelsList]
  );

  // --- Conversations ---
  const conversList = useMemo(() => {
    if (!conversations) return [];
    return conversations.map((conv) => ({
      label: conv.member.userName,
      value: conv.member.userName,
      image: conv.member.photo,
      id: conv.conversationId,
    }));
  }, [conversations]);

  const conversMap = useMemo(() => {
    if (!conversations) return {};
    return conversations.reduce((acc, conv) => {
      acc[conv.member.userName] = conv.conversationId;
      return acc;
    }, {});
  }, [conversations]);

  const conversNames = useMemo(
    () => conversList.map((c) => c.value),
    [conversList]
  );

  // --- From Users ---
  const fromList = useMemo(() => ["From", "Ahmed", "Alaa"], []);
  const userMap = useMemo(
    () => ({
      Ahmed: "68594a066a8f7e74bf320e74",
      Alaa: "68594a066a8f7e74bf320e75",
    }),
    []
  );

  // --- Clear selections on type change ---
  useEffect(() => {
    if (allType === "Channels") {
      setSelectedConvers("");
    } else if (allType === "Conversations") {
      setSelectedChannel("");
    } else {
      setSelectedChannel("");
      setSelectedConvers("");
    }
  }, [allType]);

  // --- Force Reset ---
  useEffect(() => {
    if (forceReset) {
      setSelectedChannel("");
      setSelectedConvers("");
      setSelectedFrom("");
      setStartDate("");
      setEndDate("");
      setForceReset(false);
    }
  }, [forceReset]);

  // --- Filters Output ---
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

    onFiltersChange(queryParams);
  }, [
    allType,
    selectedChannel,
    selectedConvers,
    selectedFrom,
    startDate,
    endDate,
    onFiltersChange,
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

      {allType === "Channels" && (
        <FilterItem
          text="Channel"
          selectedValue={selectedChannel}
          onSelect={setSelectedChannel}
          options={channelNames}
        />
      )}

      {allType === "Conversations" && (
        <FilterItem
          text="Conversation"
          selectedValue={selectedConvers}
          onSelect={setSelectedConvers}
          options={conversNames}
          renderOption={(name) => {
            const person = conversList.find((c) => c.value === name);
            if (!person) return <span>{name}</span>;
            return (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <img
                  src={person.image}
                  alt={name}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span>{name}</span>
              </div>
            );
          }}
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

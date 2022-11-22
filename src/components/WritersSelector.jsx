import React, { useState } from "react";
import LiveSearch from "../admin/LiveSearch";
import { searchActor } from "../api/actor";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
export default function WritersSelector({ onSelect }) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const { handleSearch, resetSearch } = useSearch();

  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    setValue("");
    resetSearch();
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };
  return (
    <LiveSearch
      name="writers"
      placeholder="Search Profile"
      results={profiles}
      renderItem={renderItem}
      onSelect={handleOnSelect}
      onChange={handleChange}
      value={value}
      visible={profiles.length}
    />
  );
}

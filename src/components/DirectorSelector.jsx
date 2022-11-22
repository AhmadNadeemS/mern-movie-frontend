import React, { useEffect, useState } from "react";
import LiveSearch from "../admin/LiveSearch";
import { searchActor } from "../api/actor";
import { useSearch } from "../hooks";
import { renderItem } from "../utils/helper";
import Label from "./Label";

export default function DirectorSelector({ onSelect, values }) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);
  const { handleSearch, resetSearch } = useSearch();
  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  useEffect(() => {
    if (values) setValue(values);
  }, [values]);

  return (
    <div>
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        value={value}
        placeholder="Search Profile"
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleChange}
        visible={profiles.length}
      />
    </div>
  );
}

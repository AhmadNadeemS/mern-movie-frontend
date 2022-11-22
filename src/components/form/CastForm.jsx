import React, { useEffect, useState } from "react";
import LiveSearch from "../../admin/LiveSearch";
import { commonInputClasses } from "../../utils/theme";
// import { results } from "../../admin/MovieForm";
import { useNotification, useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { searchActor } from "../../api/actor";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

export default function CastForm({ onSubmit }) {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);
  const { updateNotification } = useNotification();
  const { handleSearch, resetSearch } = useSearch();

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
    setProfiles([]);
  };

  const handleOnChange = ({ target }) => {
    const { name, value, checked } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });
    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { profile, roleAs } = castInfo;
    if (!profile.name) {
      return updateNotification("error", "Cast Profile is missing");
    }
    if (!roleAs.trim()) {
      return updateNotification("error", "Cast Profile is missing");
    }
    onSubmit(castInfo);
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    setProfiles([]);
    resetSearch();
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };

  const { leadActor, profile, roleAs } = castInfo;
  return (
    <div className="flex items-center space-x-2 ">
      <input
        type="checkbox"
        checked={leadActor}
        name="leadActor"
        onChange={handleOnChange}
        title="Set as lead actor"
        value={leadActor}
        // className="w-4 h-4"
      />
      <LiveSearch
        placeholder="Search Profile"
        value={profile.name}
        onSelect={handleProfileSelect}
        results={profiles}
        renderItem={renderItem}
        onChange={handleProfileChange}
        // visible={profiles.length}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Role as"
          className={commonInputClasses + " p-1 rounded text-lg border-2"}
          value={roleAs}
          name="roleAs"
          onChange={handleOnChange}
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-secondary text-white px-1 rounded"
      >
        Add
      </button>
    </div>
  );
}

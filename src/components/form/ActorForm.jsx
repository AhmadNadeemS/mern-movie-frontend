import React, { useEffect, useState } from "react";
import PosterSelector from "../../admin/PosterSelector";
import { useNotification } from "../../hooks";
import { commonInputClasses } from "../../utils/theme";
import Selector from "../Selector";
import { ImSpinner3 } from "react-icons/im";
const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

const validateActor = ({ name, about, avatar, gender }) => {
  if (!name.trim()) return { error: "Actor name is missing!" };
  if (!about.trim()) return { error: "About section is missing!" };
  if (!gender.trim()) return { error: "Actor gender is missing!" };
  if (avatar && !avatar.type?.startsWith("image"))
    return { error: "Invalid image /avatar  file" };
  return { error: null };
};

export default function ActorForm({
  title,
  btnTitle,
  onSubmit,
  busy,
  initialState,
}) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");
  const { updateNotification } = useNotification();
  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };
  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    console.log(files);
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo);
    if (error) return updateNotification("error", error);
    const formData = new FormData();
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }
    onSubmit(formData);
  };
  useEffect(() => {
    if (initialState) {
      setActorInfo({ ...initialState, avatar: null });
      setSelectedAvatarForUI(initialState.avatar);
    }
  }, [initialState]);

  const { name, about, gender } = actorInfo;
  return (
    <form
      onSubmit={handleSubmit}
      className="dark:bg-primary bg-white w-[30rem] p-3 rounded"
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-xl font-semibold text-primary dark:text-white">
          {title}
        </h1>
        <button
          className="text-white bg-primary h-8 w-24 hover:opacity-80 transition rounded flex items-center justify-center"
          type="submit"
        >
          {busy ? <ImSpinner3 className="animate-spin" /> : btnTitle}
        </button>
      </div>
      <div className="flex space-x-2">
        <PosterSelector
          label="Select avatar"
          selectedPoster={selectedAvatarForUI}
          name="avatar"
          onChange={handleChange}
          className="w-36 h-36 aspect-square object-cover rounded"
          accept="image/jpg ,image/jpeg, image/png"
        />
        <div className="flex-grow flex flex-col space-y-2">
          <input
            type="text"
            name="name"
            className={commonInputClasses + " border-b-2"}
            placeholder="Enter Name"
            onChange={handleChange}
            value={name}
          />
          <textarea
            name="about"
            value={about}
            placeholder="About"
            className={commonInputClasses + " border-b-2 resize-none h-full"}
            onChange={handleChange}
          ></textarea>
        </div>
      </div>
      <div className="mt-3">
        <Selector
          options={genderOptions}
          label="Gender"
          value={gender}
          onChange={handleChange}
          name="gender"
        />
      </div>
    </form>
  );
}

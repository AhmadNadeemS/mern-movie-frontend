import React, { useEffect, useState } from "react";
import { getAppInfo } from "../api/admin";
import AppInfoBox from "../components/AppInfoBox";
import LatestUploads from "../components/LatestUploads";
import MostRatedMovies from "../components/MostRatedMovies";
import { useNotification } from "../hooks";
export default function Dashboard() {
  const { updateNotification } = useNotification();
  const [appInfo, setAppInfo] = useState({
    movieCount: 0,
    reviewCount: 0,
    userCount: 0,
  });

  const fetchAppInfo = async () => {
    const { appInfo, error } = await getAppInfo();
    if (error) return updateNotification("error", error);
    setAppInfo({ ...appInfo });
  };
  useEffect(() => {
    fetchAppInfo();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-5 my-5 p-5 pt-0">
      <AppInfoBox
        title="Total Uploads"
        subTitle={appInfo.movieCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Reviews"
        subTitle={appInfo.reviewCount.toLocaleString()}
      />
      <AppInfoBox
        title="Total Users"
        subTitle={appInfo.userCount.toLocaleString()}
      />
      <LatestUploads />
      <MostRatedMovies />
    </div>
  );
}

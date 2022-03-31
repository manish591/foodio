import React from "react";
import "./VideoActions.css";
import { useAppServices } from "../../hooks";

const VideoActions = ({ video, setSelectedId }) => {
  const { addToWatchLater } = useAppServices();
  console.log(setSelectedId);
  return (
    <div className="video-action">
      <ul className="video-action__list">
        <li className="video-action__item flex">
          <div className="video-action__icon">
            <span className="material-icons-outlined">add_to_queue</span>
          </div>
          <p className="video-action__item-name">Add To Queue</p>
        </li>
        <li
          className="video-action__item flex"
          onClick={() => {
            setSelectedId("");
            addToWatchLater({ video });
          }}
        >
          <div className="video-action__icon">
            <span className="material-icons-outlined">watch_later</span>
          </div>
          <p className="video-action__item-name">Save To Watch Later</p>
        </li>
        <li className="video-action__item flex">
          <div className="video-action__icon">
            <span className="material-icons-outlined">playlist_add</span>
          </div>
          <p className="video-action__item-name">Save To Playlist</p>
        </li>
        <li className="video-action__item flex">
          <div className="video-action__icon">
            <span className="material-icons-outlined">share</span>
          </div>
          <p className="video-action__item-name">Share</p>
        </li>
      </ul>
    </div>
  );
};

export { VideoActions };

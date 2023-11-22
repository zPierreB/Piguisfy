/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeLow, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";

const ProgressBar = ({ currentTrack, handleSeek, audioRef, handleTimeUpdate, currentTime }) => {
  const [volume, setVolume] = useState(10);

  const formatDuration = (duration) => {
    if (duration) {
      const minutes = Math.floor(duration / 60)
      const seconds = Math.floor(duration % 60)
      return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`
    }
  }

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
    audioRef?.current?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audioRef?.current?.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef, volume]);

  return(
    <>
      <div className="progressBarContainer">
        <span>{formatDuration(currentTime)}</span>
        <input
        className="progressBar"
        type="range"
        min="0"
        max={currentTrack?.duration}
        value={currentTime && currentTime}
        onChange={handleSeek}
        />
        <span>{formatDuration(currentTrack?.duration)}</span>
      </div>
      <div className="volumeBarContainer">
        <FontAwesomeIcon icon={faVolumeLow} />
        <input
        className="progressBar"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={(e) => setVolume(e.target.value)}
        />
        <FontAwesomeIcon icon={faVolumeHigh} />
      </div>
    </>
  )
}

export default ProgressBar;
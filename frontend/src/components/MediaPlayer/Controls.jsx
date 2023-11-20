/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

const Controls = ({ handlePlayPause, isPlaying }) => {

  return(
    <div className="controlsBtnContainer">
      <button className="playBtn" onClick={handlePlayPause}>
        {isPlaying ? <FontAwesomeIcon icon={faPause} size="lg"/> : <FontAwesomeIcon icon={faPlay} size="lg"/>}
      </button>
    </div>
  )
}

export default Controls;
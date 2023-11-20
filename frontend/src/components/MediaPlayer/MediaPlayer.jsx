import { useState, useEffect, useContext, useRef } from 'react'

import DisplayTrack from './DisplayTrack'
import Controls from './Controls'
import ProgressBar from './ProgressBar'

import { UserContext } from '../../context/UserContext'

const MediaPlayer = () => {
  const { currentTrack } = useContext(UserContext)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const onChangeTrack = () => {
    if (currentTrack) {
      audioRef.current.load()
      audioRef.current.play()
      setIsPlaying(true)
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const onEnded = () => {
    setIsPlaying(false)
  }

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  useEffect(() => {
    onChangeTrack()
  }, [currentTrack])
  
  return (
    <div className="mediaPlayerContainer">
      <DisplayTrack
        currentTrack={currentTrack}
        audioRef={audioRef}
        isPlaying={isPlaying}
        onEnded={onEnded}
      />
      <Controls
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
        audioRef={audioRef}
      />
      <ProgressBar
        currentTrack={currentTrack}
        handleSeek={handleSeek}
        audioRef={audioRef}
        handleTimeUpdate={handleTimeUpdate}
        currentTime={currentTime}
      />
    </div>
  )
}

export default MediaPlayer;
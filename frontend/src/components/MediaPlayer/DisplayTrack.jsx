// eslint-disable-next-line react/prop-types
const DisplayTrack = ({ currentTrack, audioRef, isPlaying, onEnded }) => {
  return(
    <>
      <div className="mediaPlayerImage">
        <img className={isPlaying ? "isPlaying" : ""}src={`http://localhost:8000/images/disco-piguis2.png`} alt="image lecture" />
      </div>
      <div className="mediaPlayerInfo">
        <p>{currentTrack?.name}</p>
        <p>{currentTrack?.artist_name}</p>
      </div>
      <audio src={`http://localhost:8000/${currentTrack?.path}`} ref={audioRef} onEnded={onEnded}controls />
    </>
  )
}

export default DisplayTrack;
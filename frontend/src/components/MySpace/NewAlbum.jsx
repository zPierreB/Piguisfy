import { useState } from 'react'

const NewAlbum = () => {
  const [name, setName] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [cover, setCover] = useState(null)

  const handleCoverChange = (e) => {
    setCover(e.target.files[0])
  }
  return(
    <div>
      <h2>Add a new album</h2>
      <form>
        <div>
          <label htmlFor="name">Name of the album</label>
          <input type="text" name="name" id="" onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='releaseDate'>Release date</label>
          <input type='date' name='releaseDate' id='' onChange={(e) => setReleaseDate(e.target.value)}/>
        </div>
        <div>
          <label htmlFor='cover'>Cover</label>
          <input type='file' name='cover' id='' onChange={handleCoverChange}/>
        </div>
        <div>
          <button type="submit">Create a song</button>
        </div>
      </form>
    </div>
  )
}

export default NewAlbum
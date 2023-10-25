import { useState, useRef } from 'react'
import axios from 'axios'

const NewSong = () => {
  const audioPlayer = useRef(null)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('name', name)

    console.log('file: ', file)
    console.log('name: ', name)

    await axios.post('http://localhost:8000/myspace/addsong', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      throw error
    })
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setName(e.target.files[0].name)
  }

  return(
    <div>
      <h2>Add a new song</h2>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="name">Name of the song</label>
          <input type="text" name="name" id="" onChange={(e) => setName(e.target.value)}/>
        </div> */}
        <div>
          <label htmlFor='path'>File</label>
          <input type='file' name='file' id='' onChange={handleFileChange}/>
        </div>
        <div>
          <button type="submit">Create a song</button>
        </div>
      </form>
    </div>
  )

}

export default NewSong
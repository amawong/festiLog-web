import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../api/client"


function Artists() {
  const [artists, setArtists] = useState([])


  useEffect(() => {
      api.get('/api/artists')
        .then(res => setArtists(res.data.ranked))
        .catch(err => console.error(err))
    }, [])  // [] means "run once component loads"

  return (
    <div>
      <Navbar />
      {artists.length === 0 && <p>No artists yet. Log a set to get started!</p>}
        {artists.map(artist => (
          <div key={artist.id}>
            <h3>{artist.name}</h3>
            <p>Average Rating: {artist.avgRating ? artist.avgRating.toFixed(1) : 'N/A'}</p>
            <p>Times seen: {artist.sets.length}</p>
          </div>
        ))}
    </div>
  )
}

export default Artists
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../api/client"
import Navbar from "../components/Navbar"



function EventDetail() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [artist, setArtist] = useState('')
    const [rating, setRating] = useState('')
    const [notes, setNotes] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        api.get(`/api/events/${id}`)
        .then(res => setEvent(res.data.event))
        .catch(err => console.error(err))
        
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()         // prevents page from refreshing on form submit
        try {
            const res = await api.post(`/api/events/${id}/sets`, { artist, rating, notes })
            setEvent(prev => ({...prev, sets: [...prev.sets, res.data.set]}))
            setArtist('')
            setRating('')
            setNotes('')
            setError('')

        } catch (e) {
            setError('Could not add set')
        }
    }

    const handleDeleteSet = async (setId) => {
        try {
            await api.delete(`/api/sets/${setId}`)
            setEvent(prev => ({...prev, sets: prev.sets.filter(s => s.id !== setId) }))
            setError('')
        } catch (e) {
            setError('Could not delete')
        }                                   
    }

    if (!event) return <div>Loading...</div> 

    return (
        <div>
            <Navbar />
            <h2>{event.name}</h2>
            <p>{event.venue}, {event.city}</p>
            <p>{new Date(event.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>

            <h3>Sets</h3>
            <div className="card-grid">
                {event.sets.length === 0 && <p>No sets logged yet.</p>}
                {event.sets.map(set => (
                    <div className="card" key={set.id}>
                        <p>{set.artist.name}</p>
                        <p>Rating: {set.rating ?? 'N/A'}</p>
                        <p>Notes: {set.notes}</p>
                        <button onClick={() => handleDeleteSet(set.id)}>Delete</button>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={artist}
                required
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Artist Name"
              />
              <input 
                type="number" min="1" max="10"
                value={rating}
                required
                onChange={(e) => setRating(e.target.value)}
                placeholder="Rating"
              />
              <input 
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Notes"
              />
              <button type="submit">Add Set</button>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </form>

        </div>  
    )
}

export default EventDetail
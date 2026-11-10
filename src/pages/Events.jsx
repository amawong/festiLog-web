import { useState, useEffect } from 'react'
import api from '../api/client'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

function Events() {
    const [events, setEvents] = useState([]) // [] instead of null => can use .map w/o a loading check
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [venue, setVenue] = useState('')
    const [date, setDate] = useState('')
    const [genre, setGenre] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
      api.get('/api/events')
        .then(res => setEvents(res.data.event))
        .catch(err => console.error(err))
    }, [])  // [] means "run once component loads"
    
    const handleSubmit = async (e) => {
        e.preventDefault()         // prevents page from refreshing on form submit
        try {
            const res = await api.post('/api/events', { name, city, venue, date, genre })
            setEvents(prev => [...prev, res.data.event])
            setName('')
            setCity('')
            setVenue('')
            setDate('')
            setGenre('')
            setError('')

        } catch (e) {
            setError('Invalid event')
        }
    }

    const handleDelete = async (id) => {
      try {
        await api.delete(`/api/events/${id}`)
        setEvents(prev => prev.filter(e => e.id !== id))
        setError('')
      
      } catch (e) {
          setError('Could not delete event')
      }
    }

    return (
        <div>
          <Navbar />
            {events.map(event => (
              <div key={event.id}>
                <h3><Link to={`/events/${event.id}`}>{event.name}</Link></h3>
                <p>{event.city}</p>
                <p>{event.venue}</p>
                <p>{new Date(event.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>
                <p>{event.genre}</p>
                <button onClick={() => handleDelete(event.id)}>Delete</button>
              </div>
            ))}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                placeholder="Event Name"
              />
              <input 
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
              <input 
                type="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
              <input 
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Venue"
              />
              <input 
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Genre"
              />
              <button type="submit">Add Event</button>
              {error && <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    )
}

export default Events
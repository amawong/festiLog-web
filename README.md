# FestiLog 🎧

A full-stack web app for logging the concerts, raves, and festivals you've been to, rating every set you saw, and ranking the artists you love most.

**Live demo:** https://festi-log-web.vercel.app/

> The backend runs on a hosted tier that can go to sleep when idle, so the very first request after a quiet period may take a little while to respond. Refresh once if the first login or page load seems slow.

<!-- Add screenshots here: Dashboard, Events, Event Detail -->
<!-- ![Dashboard](./screenshots/dashboard.png) -->

---

## Features

- **Auth:** register and log in with JWT-based authentication; passwords are hashed with bcrypt
- **Events:** log concerts and festivals with venue, city, date, and genre, and delete them
- **Sets:** open an event to log each artist you saw, with a 1-10 rating and notes
- **Artist rankings:** artists are ranked by your average rating, with how many times you've seen each one
- **Dashboard:** totals for events, artists, sets, and your average rating
- **Private by design:** every record is scoped to its owner, and ownership is checked through nested resources (Set → Event → User)

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, Axios |
| Backend | Node.js, Express |
| Database | PostgreSQL with Prisma ORM |
| Auth | JWT (`jsonwebtoken`) + `bcryptjs` |
| Hosting | Vercel (frontend), Railway (API + Postgres) |

---

## Architecture

```
React (Vercel)  ──HTTPS──▶  Express API (Railway)  ──▶  PostgreSQL (Railway)
   Axios + JWT                 Prisma ORM
```

- The React app stores the JWT in `localStorage`, and an Axios request interceptor attaches it to every call. A response interceptor sends the user back to login on a 401.
- The Express API protects routes with auth middleware that verifies the token and attaches `req.userId`.
- CORS is restricted to the deployed frontend origin through an environment variable.

### Data model

```
User    id, email, username, password (hashed), createdAt
Event   id, userId (FK), name, venue, city, date, genre, notes, createdAt
Artist  id, name (unique), spotifyId, genre, imageUrl
Set     id, eventId (FK, cascade delete), artistId (FK), startTime, rating, notes, createdAt
```

- A User has many Events, and an Event has many Sets.
- A Set links one Event to one Artist and holds that performance's rating and notes.
- Artists are created on demand with a Prisma `upsert`, so seeing the same artist twice reuses one record.
- Deleting an event cascades to its sets.

---

## API reference

All routes except register and login require an `Authorization: Bearer <token>` header.

### Auth
| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Create an account, returns a JWT |
| POST | `/api/auth/login` | Log in, returns a JWT |

### Events
| Method | Route | Description |
|---|---|---|
| GET | `/api/events` | List your events |
| POST | `/api/events` | Log a new event |
| GET | `/api/events/:id` | One event with its sets and artists |
| PUT | `/api/events/:id` | Edit an event |
| DELETE | `/api/events/:id` | Delete an event and its sets |

### Sets
| Method | Route | Description |
|---|---|---|
| POST | `/api/events/:eventId/sets` | Add a set to an event |
| PUT | `/api/sets/:id` | Edit a set's rating, notes, or start time |
| DELETE | `/api/sets/:id` | Delete a set |

### Artists
| Method | Route | Description |
|---|---|---|
| GET | `/api/artists` | Artists you've seen, ranked by average rating |
| GET | `/api/artists/:id` | One artist with your set history |

### Stats
| Method | Route | Description |
|---|---|---|
| GET | `/api/stats` | Totals for events, artists, sets, and average rating |
| GET | `/api/stats/timeline` | Events grouped by month |

---

## Running locally

**Prerequisites:** Node.js 18+ and PostgreSQL.

### Backend ([festiLog](https://github.com/amawong/festiLog))

```bash
git clone https://github.com/amawong/festiLog.git
cd festiLog
npm install
cp .env.example .env        # then fill in your values
npx prisma db push          # create the tables
npm run dev                 # http://localhost:3001
```

`.env` variables:

```
DATABASE_URL="postgresql://localhost:5432/festilog"
JWT_SECRET="a-long-random-string"
FRONTEND_URL="http://localhost:5173"
PORT=3001
```

### Frontend ([festilog-web](https://github.com/amawong/festilog-web))

```bash
git clone https://github.com/amawong/festilog-web.git
cd festilog-web
npm install
npm run dev                 # http://localhost:5173
```

Optionally set `VITE_API_URL` to point at a different API. It defaults to `http://localhost:3001`.

---

## Deployment

- **Frontend:** Vercel, with `VITE_API_URL` set to the API's URL and a `vercel.json` rewrite so client-side routes work on refresh.
- **Backend:** Railway, with `DATABASE_URL` referencing the Postgres service's private URL, plus `JWT_SECRET` and `FRONTEND_URL`.

---

## What I learned

- Designing a RESTful API from scratch: resource naming, HTTP methods, status codes, and validation
- Authentication end to end: password hashing, signing and verifying JWTs, and protecting routes with middleware
- Relational modeling with Prisma: foreign keys, join-style tables, `upsert`, cascading deletes, and aggregate queries
- Authorization across nested resources, so a user can only touch their own sets
- React fundamentals: state, effects, controlled forms, protected routes, and immutable state updates (including nested objects)
- Shipping to production: environment variables, CORS, and debugging a deployed app from browser and server logs

---

## Roadmap

- [ ] Edit events and sets from the UI
- [ ] Link between the login and register pages
- [ ] Set start times in the add-set form
- [ ] Spotify integration for artist images and genres
- [ ] Event timeline chart on the dashboard
- [ ] Automated tests

---

## Author

Amanda Wong · [LinkedIn](https://www.linkedin.com/in/amandawong10) · [GitHub](https://github.com/amawong)

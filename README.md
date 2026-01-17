# URL Shortener API

A simple, fast and RESTful URL shortening service built with **Node.js** and **Express.js**.

## Features

- Create short URLs from long ones
- Redirect users from short code to original URL
- Update destination URL of existing short link
- Delete short URLs
- View usage statistics (click/access count)
- Input validation & proper HTTP status codes
- Random unique short code generation

## API Endpoints

| Method   | Endpoint                  | Description                          | Response Statuses              |
|----------|---------------------------|--------------------------------------|--------------------------------|
| `POST`   | `/shorten`                | Create a new short URL               | 201, 400                       |
| `GET`    | `/shorten/:shortCode`     | Get info about short URL             | 200, 404                       |
| `PUT`    | `/shorten/:shortCode`     | Update destination URL               | 200, 400, 404                  |
| `DELETE` | `/shorten/:shortCode`     | Delete a short URL                   | 204, 404                       |
| `GET`    | `/shorten/:shortCode/stats`| Get statistics (click count, etc.)   | 200, 404                       |

### 1. Create Short URL

```http
POST /shorten
Content-Type: application/json

{
  "url": "https://www.example.com/very/long/url/path"
}
```

**Success Response (201 Created)**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "https://www.example.com/very/long/url/path",
  "shortCode": "xK9pL2",
  "createdAt": "2025-01-17T14:30:22.123Z",
  "updatedAt": "2025-01-17T14:30:22.123Z"
}
```

### 2. Get Short URL Info

```http
GET /shorten/xK9pL2
```

**Success (200 OK)** → same body as creation  
**Not Found (404)**

### 3. Update Destination URL

```http
PUT /shorten/xK9pL2
Content-Type: application/json

{
  "url": "https://new-destination.com/page"
}
```

**Success (200 OK)** → updated object  
**Not Found (404)** | **Bad Request (400)**

### 4. Delete Short URL

```http
DELETE /shorten/xK9pL2
```

**Success (204 No Content)**  
**Not Found (404)**

### 5. Get Statistics

```http
GET /shorten/xK9pL2/stats
```

**Success (200 OK)**

```json
{
  "id": "507f1f77bcf86cd799439011",
  "url": "https://www.example.com/very/long/url/path",
  "shortCode": "xK9pL2",
  "createdAt": "2025-01-17T14:30:22.123Z",
  "updatedAt": "2025-01-17T14:30:22.123Z",
  "accessCount": 47
}
```

> **Note:** Redirect happens on `GET /:shortCode` (without `/shorten/` prefix)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database** (choose one):
  - MongoDB + Mongoose
  - PostgreSQL + Prisma / Sequelize
  - SQLite (development)
- **Validation**: Joi / Zod / express-validator
- **Short code generation**: custom or nanoid / cuid

## Project Structure (suggested)

```
url-shortener/
├── src/
│   ├── controllers/
│   │   └── url.controller.js
│   ├── models/
│   │   └── url.model.js
│   ├── routes/
│   │   └── url.routes.js
│   ├── middleware/
│   │   ├── validate.js
│   │   └── errorHandler.js
│   ├── utils/
│   │   └── shortCodeGenerator.js
│   ├── config/
│   │   └── db.js
│   └── app.js
├── .env
├── .env.example
├── package.json
└── README.md
```

## Installation

```bash
# Clone the repository
git clone https://github.com/blackbox24/url-shortener.git

# Go into the project directory
cd url-shortener

# Install dependencies
npm install

# Copy example env file
cp .env.example .env

# Edit .env file (database url, port, etc.)
# Start development server
npm run dev
```

## Development

```bash
# Run with nodemon (recommended)
npm run dev

# Run production mode
npm start
```

## Future Improvements (ideas)

- Rate limiting
- Custom short codes
- Expiration dates
- Password protection
- Analytics dashboard (basic frontend)
- QR code generation
- Bulk URL shortening

---

Made with ❤️ and too many redirects  
Happy shortening!

### ROADMAP.SH

https://roadmap.sh/projects/url-shortening-service
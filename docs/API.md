# SKY HOME FURNISHING - API Documentation

## Base Endpoint
`http://localhost:5000/api` or `/api` (Proxied via Nginx)

---

## Authentication Endpoints (`/api/auth`)

### 1. Admin Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "admin@skyhome.com",
    "password": "SkyHome2026!"
  }
  ```
- **Response**: Sets HttpOnly `token` cookie and returns JWT payload.

### 2. Current Profile
- **GET** `/api/auth/me`
- **Headers**: `Authorization: Bearer <token>` or Cookie

### 3. Logout
- **POST** `/api/auth/logout`

---

## Products API (`/api/products`)

### 1. List Products
- **GET** `/api/products`
- **Query Parameters**:
  - `category`: Filter by category slug (e.g. `sofas`, `beds`, `dining`)
  - `collection`: Filter by collection slug (e.g. `modern-living`, `royal-collection`)
  - `bestseller`: `true`
  - `featured`: `true`
  - `search`: Search query string

### 2. Get Product Detail
- **GET** `/api/products/:idOrSlug`

### 3. Create Product (Admin Only)
- **POST** `/api/products`
- **Headers**: `Authorization: Bearer <token>`

---

## Contact Inquiries API (`/api/inquiries`)

### 1. Submit Inquiry (Public)
- **POST** `/api/inquiries`
- **Rate Limit**: 5 submissions per 15 mins per IP
- **Body**:
  ```json
  {
    "name": "Lord Alexander Thorne",
    "phone": "+91 98765 43210",
    "email": "alexander@estate.com",
    "query": "Inquiring regarding custom dimensioning for Monaco Sectional.",
    "productTitle": "Monaco Velvet Modular Sectional"
  }
  ```

### 2. List Inquiries (Admin Only)
- **GET** `/api/inquiries?status=PENDING&search=Thorne`

### 3. Update Inquiry Status (Admin Only)
- **PATCH** `/api/inquiries/:id/status`
- **Body**: `{ "status": "CONTACTED" }`

### 4. Delete Inquiry (Admin Only)
- **DELETE** `/api/inquiries/:id`

---

## Newsletter Subscribers API (`/api/subscribers`)
- **POST** `/api/subscribers` - Subscribe email to newsletter
- **GET** `/api/subscribers` - List all subscribers (Admin only)

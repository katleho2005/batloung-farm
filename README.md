# Batloung Farm Distribution System (DIWA2110)

1. **Database**: `mysql -u root -p < database/schema.sql` (creates `batloung_farm` with sample data)
2. **API**: `cd backend && cp .env.example .env` (edit password) `&& npm install && npm run dev` (port 5000)
3. **Dashboard**: `cd frontend && npm install && npm run dev` (http://localhost:5173)

## Key endpoints
Suppliers `/api/suppliers[/:id]` · Fruits `/api/fruits` · Stock `/api/stock`, `/api/stock/low?threshold=10`
Vendors `/api/vendors?search=`, `/api/vendors/balances` · Purchases `POST /api/purchases` · Sales `POST /api/sales`, `POST /api/sales/:id/payments`
Reports `/api/reports/top-fruits`, `/revenue?from=&to=`, `/top-vendor`, `/summary`

## Transaction demo (reject whole sale)
Seed data has 4 large boxes of grapes (fruit 5). This must return 400 and change nothing:
`POST /api/sales {"vendor_id":1,"items":[{"fruit_id":1,"packaging_size":"SMALL","quantity":1},{"fruit_id":5,"packaging_size":"LARGE","quantity":10}]}`
The first item is rolled back along with the failed one (`ROLLBACK`); check `GET /api/stock` and `GET /api/sales`.

## Deploying (live link)
Database: Railway / Aiven MySQL. API: Render / Railway (set the `.env` values as environment variables).
Frontend: Vercel / Netlify with `VITE_API_URL=https://<your-api>/api`.

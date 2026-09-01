# SKY HOME FURNISHING - Deployment & Production Checklist

## 1. Quick Start via Docker Compose

### Step 1: Clone Repository
```bash
git clone https://github.com/skyhome/skyhome-furnishing.git
cd skyhome-furnishing
```

### Step 2: Launch Production Stack
```bash
cd docker
docker compose up -d --build
```

### Step 3: Run Database Migrations & Seed Data
```bash
docker exec -it skyhome_backend npm run db:migrate
docker exec -it skyhome_backend npm run db:seed
```

### Access Services:
- **Nginx Web Application**: `http://localhost`
- **Frontend Direct (Next.js)**: `http://localhost:3000`
- **Backend API Direct**: `http://localhost:5000`
- **PostgreSQL**: `localhost:5432`
- **Redis Cache**: `localhost:6379`
- **Admin Dashboard**: `http://localhost/admin/login` (or direct Next.js port `http://localhost:3000/admin/login`)
  - Email: `admin@skyhome.com`
  - Password: `SkyHome2026!`

---

## 2. Cloud Provider Deployments

### AWS (ECS / EC2 + RDS PostgreSQL + ElastiCache Redis)
1. Deploy PostgreSQL to AWS RDS PostgreSQL.
2. Deploy Redis to AWS ElastiCache.
3. Build & push Docker images to AWS ECR.
4. Launch ECS Fargate tasks for `frontend` and `backend`.
5. Point AWS ALB (Application Load Balancer) to Nginx / ECS Service.

### Vercel + Render Deployment
- **Frontend**: Deploy `apps/frontend` to Vercel. Set `NEXT_PUBLIC_API_URL` environment variable.
- **Backend**: Deploy `apps/backend` to Render / Railway with PostgreSQL and Redis add-ons.

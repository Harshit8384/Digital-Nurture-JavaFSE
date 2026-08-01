# Module 13 - Containerization using Docker Exercise

The handbook only links to reading material here too — no hands-on file
existed in the repo. This gives you a real container to build and run.

## Prerequisites
Install Docker Desktop (or Docker Engine on Linux).

## Part A - Containerize the Angular frontend
1. Place `Dockerfile.frontend` at the root of your working copy of this
   pack (paths inside it assume the layout of this zip — adjust if you
   moved things).
2. Build it:
   ```bash
   docker build -f "Module 13 - Docker/Dockerfile.frontend" -t student-course-portal:latest .
   ```
3. Run it:
   ```bash
   docker run -p 4200:80 student-course-portal:latest
   ```
4. Open `http://localhost:4200` and confirm the app loads from inside
   the container.

## Part B - Containerize a Spring Boot service
1. Pick any Spring Boot REST project from Week 2-4 (for example,
   `CountryRESTService` or one of the `Microservices` projects).
2. Copy `Dockerfile.backend.sample` into that project's root folder and
   rename it to `Dockerfile`. Update the JAR filename/path if needed.
3. Build and run:
   ```bash
   docker build -t country-rest-service:latest .
   docker run -p 8080:8080 country-rest-service:latest
   ```
4. Hit an endpoint (e.g. `curl http://localhost:8080/countries`) to
   confirm it works from inside the container.

## Part C - Run both together with Docker Compose
1. Edit `docker-compose.yml` so `backend.build.context` points at the
   Spring Boot project folder from Part B.
2. Run:
   ```bash
   docker compose up --build
   ```
3. Confirm the frontend (port 4200) and backend (port 8080) both start
   and can reach each other on the shared Compose network (service name
   `backend` is resolvable from inside the `frontend` container).

## Part D - Explore Docker basics (record answers in `DOCKER_NOTES.md`)
Run each command and note what it shows:
```bash
docker images
docker ps
docker inspect student-course-portal:latest
docker network ls
docker volume ls
```

## Self-Evaluation
- [ ] Frontend image builds and runs, app loads in the browser
- [ ] Backend image builds and runs, endpoint responds
- [ ] `docker compose up` starts both services together
- [ ] Completed `DOCKER_NOTES.md` with command outputs summarized
- [ ] Can explain image layers vs containers vs volumes in your own words

# attrecto-todo
## Setup

There is two .env that must exists
[Frontend Config file example here](./frontend/.env.example)
&
[Global Config file example here](./.env.example)

### Build with Docker

docker-compose up --build

### Run without Docker
Modify configuration to manage to connect to your local Postgres database
```
POSTGRES_USER=admin
POSTGRES_PASSWORD=longestpassword
POSTGRES_SERVER=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=master
POSTGRES_COLLATION=Hungarian_CI_AS
```
```
 cd ./backend && npm run start:dev
 cd ./frontend && npm run start
```

### Cron and SMTP settings
If cron is enabled, services is sending email(s)
to the user for every todo, that has due date.(In the last hour, only once)
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=admin
SMTP_PASSWORD=longestpassword
CRON_ENABLED=false
```

#### Purpose
###### Candidate test

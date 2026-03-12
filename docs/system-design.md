# System Design & Supabase Setup

## Why Supabase?
Supabase is an open-source Firebase alternative powered by PostgreSQL. It gives you a real relational database, which is perfect for storing structured resume data like JSON skill arrays, scores, and candidate details.

## Database Schema setup

Run this in your Supabase SQL Editor:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    skills TEXT, -- Can store JSON strings here
    suggestions TEXT, -- Can store JSON strings here
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Connecting Spring Boot to Supabase
In your `application.properties` add:

```properties
spring.datasource.url=jdbc:postgresql://aws-0-REGION.pooler.supabase.com:6543/postgres
spring.datasource.username=postgres.YOUR_PROJECT_REF
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
```

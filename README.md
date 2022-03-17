# Brightannica LO Extractor

## Stack

- Typescript
- Express
- Jest as Unit Test
- Wiston as Logger
- Running Cron Using **node-cron**

## Automatic Generator

```bash
./cli.js --help
```

## Docker

If run locally, you can start **docker-compose up -d** for deploy database PostgreSQL

## Development

1. Copy `.env.example` to `.env`
2. Install Pacakge with `npm install`
3. Start Project with `npm run dev:start`

## Controller Generator (CLI)

```bash
./cli.js generate:controller -v -p admin -n AdminUser
```

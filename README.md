# Prisma 2 with MongoDB and APollo GraphQL

# Note:

The MongoDB driver for Prisma is still in early access, so please do not use this for production.

## Steps to run:

-   Change the `.env` file in the project to your own mongoDB database.
-   Install dependencies

```bash
yarn install
```

-   Run the dev server

```bash
# For GraphQL, run
yarn dev

# For REST, run
yarn dev:rest
```

Visit [localhost:8000](http://localhost:8000) in your browser to view the site.

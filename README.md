# Project

## 💻 Configuration

After cloning the project locally, you can install the necessary dependencies with:

```
npm i
```

To create the `Docker containers`:

```
docker compose up -d
```

`.env` files are required for the application to function (for both `frontend` and `backend`). `.env.example` files are available with the expected values.

Once these steps are completed, you can start the project by running the following command (in both `/frontend` and `/backend`):

```
npm run dev
```

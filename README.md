# URL Shortener with Analytics

This project is a full-stack URL Shortener web application that allows users to convert long URLs into short, shareable links while also tracking analytics such as total clicks.

I built this project to get hands-on experience with full-stack development, serverless backend functions, cloud deployment, PostgreSQL databases, and API integration.

# Live Project

Frontend:
[https://url-shortener-analytics-lake.vercel.app](https://url-shortener-analytics-lake.vercel.app)

GitHub Repository:
[https://github.com/tarunisanjana/url-shortener-analytics](https://github.com/tarunisanjana/url-shortener-analytics)


# What This Project Can Do

* Convert long URLs into short links
* Redirect users instantly using shortened URLs
* Track how many times a link was opened
* Store shortened links in a PostgreSQL database
* Use serverless backend APIs for handling requests
* Deploy frontend and backend using Vercel


# Tech Stack Used

## Frontend

* React
* Axios
* CSS

## Backend

* Node.js
* Vercel Serverless Functions

## Database

* PostgreSQL (Supabase)

## Deployment & Version Control

* GitHub
* Vercel

# API Endpoints

## Shorten a URL

```http
POST /api/shorten
```

Example Request:

```json
{
  "url": "https://google.com"
}
```



## Redirect to Original URL

```http
GET /api/redirect?code=abc123
```



## View Analytics

```http
GET /api/analytics?code=abc123
```



# Database

The project uses PostgreSQL hosted on Supabase.

Main tables used:

## urls

Stores:

* original URL
* generated short code
* click count
* creation date

## clicks

Stores:

* click timestamps
* user activity data
* analytics information



# Running the Project Locally

## Install Dependencies

```bash
npm install
```

Frontend dependencies:

```bash
cd frontend
npm install
```



# Environment Variable

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
```


# Start the Project

## Run Backend

```bash
vercel dev
```

## Run Frontend

```bash
cd frontend
npm start
```






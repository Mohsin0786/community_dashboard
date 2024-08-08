# Telegram Trends Dashboard

## Overview

The Telegram Trends Dashboard is a React-based application that allows you to visualize and analyze key metrics related to your Telegram group or channel. This dashboard provides an overview of your group's performance, including total members, total messages, active members, growth rate, and top contributors.

## Setup and Installation

To run the Telegram Trends Dashboard locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/telegram-trends-dashboard.git
    ```

2. **Install dependencies:**
    ```bash
    cd telegram-trends-dashboard
    cd frontend
    npm install
    ```
4. **Create a `.env` file with your configuration:**
    Ensure you have a `.env` file with necessary environment variables, such as database connection strings or API keys. A sample `.env` file might look like this:
    ```
    VITE_BACKEND_URL=[http://localhost:5000/api
    ```
3. **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will now be running at [http://localhost:3000](http://localhost:3000). or any other specified port

### Backend

follow these steps to run backend service:

1. **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file with your configuration:**
    Ensure you have a `.env` file with necessary environment variables, such as database connection strings or API keys. A sample `.env` file might look like this:
    ```
    MONGO_URI=your-database-url
    ```

4. **Start the backend server:**
    ```bash
    npm run dev
    ```
    The backend service will now be running at [http://localhost:5000](http://localhost:5000) (or another port specified in your `.env` file).

## Key Components and Architecture

The Telegram Trends Dashboard is built using the following key components and technologies:

- **React:** The entire application is built using the React library, which provides a component-based architecture and efficient rendering.
- **Recharts:** The dashboard utilizes the Recharts library to create various charts and graphs, including the bar chart for the growth rate.
- **Shadcn/ui:** The UI components, such as cards, headers, and titles, are provided by the Shadcn/ui library, which ensures a consistent and visually appealing design.
- **Lucide-react:** The icons used throughout the dashboard are from the Lucide-react library, providing a clean and modern visual style.

The application's architecture follows a typical React component structure, with the main `TelegramTrendsDashboard` component handling the overall layout and composition of the different sections. This component receives the Telegram trends data as props and passes it down to smaller, more specialized components responsible for rendering the individual elements, such as the overview cards, the growth rate chart, and the top contributors list.

The data for the dashboard is currently hardcoded within the `TelegramTrendsDashboard` component. In a real-world scenario, this data would likely be fetched from an API or a database and passed down as props.

By following this modular and component-based approach, the Telegram Trends Dashboard is easy to maintain, extend, and customize to fit the specific needs of your Telegram group or channel.


## API Endpoints

### `/community/summary`

**Method:** `GET`

**Description:** Fetches the total number of members and messages.

**Response:**
```json
{
  "totalMembers": <number>,
  "totalMessages": <number>
}


### `/community/members`

**Method:** `GET`

**Description:** Retrieves the count of active and inactive members. Active members are those who have been active in the last 7 days..

**Response:**
```json
{
  "activeMembersCount": <number>,
  "inactiveMembersCount": <number>
}

### `/community/top-contributors`

**Method:** `GET`

**Description:** Provides a list of top 5 contributors based on message count.
**Response:**
```json
{
  "topContributors": [
    {
      "username": "<username>",
      "messageCount": <number>
    },
    ...
  ]
}

### `/community/growth-rate`

**Method:** `GET`

**Description:** Shows the growth rate of new members by month, with a cumulative total.

**Response:**
```json
{
  "growthRate": [
    {
      "date": "<YYYY-MM-DD>",
      "newMembers": <number>,
      "totalMembers": <number>
    },
    ...
  ]
}

/community/engagement-rate
### `/community/engagement-rate`

**Method:** `GET`

**Description:** Provides the number of messages sent by month..

**Response:**
```json
{
  "engagementRate": [
    {
      "date": "<YYYY-MM-DD>",
      "messages": <number>
    },
    ...
  ]
}

## Key Components
Express.js: The application is built using Express.js for routing and handling API requests.
MongoDB: Data is stored and retrieved from MongoDB, with Mongoose used for schema modeling and queries.
Aggregation: Aggregation pipelines are used to calculate metrics such as growth rate and engagement rate.

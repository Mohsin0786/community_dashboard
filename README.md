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
```


### `/community/members`

**Method:** `GET`

**Description:** Retrieves the count of active and inactive members. Active members are those who have been active in the last 7 days..

**Response:**
```json
{
  "activeMembersCount": <number>,
  "inactiveMembersCount": <number>
}
```
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
```
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
```
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
```

## Key Components
Express.js: The application is built using Express.js for routing and handling API requests.
MongoDB: Data is stored and retrieved from MongoDB, with Mongoose used for schema modeling and queries.
Aggregation: Aggregation pipelines are used to calculate metrics such as growth rate and engagement rate.


# Dummy Data Generation Script

## Overview

This script is designed to populate the MongoDB database with dummy data for the Telegram Trends Dashboard application. It generates mock users and messages using the Faker.js library, which helps in testing and development by providing realistic-looking data.

## Setup

To use this script, you need to ensure that you have the following:

1. **MongoDB Database URI:** Ensure you have a `.env` file in your project root with the MongoDB URI configured as `MONGO_URI`. The `.env` file should look like this:
    ```
    MONGO_URI=your-mongodb-uri
    ```

2. **Dependencies:** Install the required Node.js packages if you haven't already:
    ```bash
    npm install dotenv mongoose @faker-js/faker
    ```

## Script Description

### `generateUsers`

This function generates a specified number of mock users. Each user has the following attributes:
- `username`: A randomly generated username.
- `joinDate`: A date within the past year.
- `lastActive`: A date between the `joinDate` and the current date.
- `messageCount`: A random integer between 10 and 100.

The function inserts these users into the `User` collection.

### `generateMessages`

This function generates a specified number of mock messages. Each message is associated with a randomly selected user from the `User` collection and has the following attributes:
- `userId`: The ID of the user who sent the message.
- `content`: A randomly generated sentence.
- `timestamp`: A date between the user's `joinDate` and the current date.

The function inserts these messages into the `Message` collection.

### `generateMockData`

This is the main function that performs the following steps:
1. Connects to the MongoDB database using the URI specified in the `.env` file.
2. Clears existing data from the `User` and `Message` collections.
3. Generates and inserts 150 mock users and 3000 mock messages.
4. Disconnects from the MongoDB database.

## Running the Script

To run the script and generate the dummy data, execute the following command:

```bash
node path/to/your/script.js


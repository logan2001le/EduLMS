# Project Name

Welcome to Project Name! This project is designed by Duy Long , Le.
The project is about LMS intergrating with virtual meeting and real-time communication 
This was developed in web application and mobile for role user ( student)

## Installation

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 18.7.1): [Download](https://nodejs.org/)
- npm (version 9.8.1): Included with Node.js installation
- MySQL database (optional): [Download](https://dev.mysql.com/downloads/workbench/)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/logan2001le/EduLMS.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd EduLMS
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Configure environment variables:**

   - Create a `.env` file in the root directory.
   - Define environment variables such as database connection details, API keys, or other configurations.

## Usage

1. **Start the server:**

   ```bash
   npm run start
   ```

2. **Access the application:**

   Open a web browser and navigate to `http://localhost:3000` to access the application.

3. **Start the mobile app:**
     ```bash
   npm react-native start
   ```

## Configuration

### Environment Variables

- `PORT`: Port number for the server (default: 3000)
- `DB_HOST`: Hostname of the MySQL database server
- `DB_USER`: Username for database authentication
- `DB_PASSWORD`: Password for database authentication
- `DB_DATABASE`: Name of the MySQL database

### Example .env file

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_DATABASE=my_database



```
## Reference:
Clone the 3rd party service Comechat - Realtime communication by https://github.com/cometchat/cometchat-sample-app-angular




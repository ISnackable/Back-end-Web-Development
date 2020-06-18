# Back-end Web Development
The backend API Specs for SP Travel. The API specs would support functionalities such as user registration, publication of travel listing info, itinerary and user travel reviews.  

## Dependencies
The following tools should be installed before starting:
* [NodeJS](https://nodejs.org/en/)
* [MySQL](https://www.mysql.com/)
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/)
* [Postman](https://www.postman.com/)

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

You should update npm to the latest version to improve the functionality or be obligatory for security purposes.
* npm
```sh
npm install -g npm@latest
```

### Installation

1. Go to the root of the folder
2. Create a `.env` file with these contents and replace the <> field with your config.
```
EXPRESS_HOSTNAME=<express ip / hostname>
EXPRESS_PORT=<express port>
DB_USERNAME=<database username>
DB_PASSWORD=<database passsword>
DB_DATABASE=<database name>
```
3. Install the node_modules
```sh
npm install
```
4. Open `docs/sptravel2020-06-18.sql`, select and copy all and paste it in MySQL Workbench
5. Execute the MySQL statements you copied to MySQL Workbench by clicking the yellow lightning symbol ⚡
6. Open `docs/Assignment.postman_collection.json`, and import it into Postman by clicking import and dragging the file into it

### Usage
To start trying out the server, follow the steps below.

1. Make sure you have all of the dependencies installed
2. Navigate into the directory `cd Back-end-Web-Development`
3. Run the app.js file, ```npm run start-dev```
4. Try out the requests with Postman
5. That's all.
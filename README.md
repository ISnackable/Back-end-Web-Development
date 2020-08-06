[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<br />
<p align="center">
  <a href="https://github.com/ISnackable/Back-end-Web-Development/">
    <img src="./logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Back-end Web Development</h3>

  <p align="center">
    The backend API Specs for SP Travel.
    <br />
    <a href="https://github.com/ISnackable/Back-end-Web-Development/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ISnackable/Back-end-Web-Development/">View Demo</a>
    ·
    <a href="https://github.com/ISnackable/Back-end-Web-Development/issues">Report Bug</a>
    ·
    <a href="https://github.com/ISnackable/Back-end-Web-Development/issues">Request Feature</a>
    ·
    <a href="https://github.com/ISnackable/Back-end-Web-Development/pulls">Send a Pull Request</a>
  </p>
</p>

## Table of Contents

* [About the Project](#about-the-project)
* [Getting Started](#getting-started)
  * [Dependencies](#dependencies)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Acknowledgements](#acknowledgements)

## About The Project

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

1. Go to the `Back-end-Web-Development/server` folder
2. Create a `.env` file with these contents and replace the <> field with your config.
```
EXPRESS_HOSTNAME=localhost
EXPRESS_PORT=8081
DB_USERNAME=root
DB_PASSWORD=<database password>
DB_DATABASE=sptravel
SECRET=<jwt secret key>
```
3. Open MySQL Workbench, click on Server tab > Data Import. Make sure that "Import from Dump Project Folder" is checked, click on the "..." and select `Back-end-Web-Development/server/docs/SPTravel_Dump2020-08-06` folder. 
4. Make sure that sptravel schema is checked and click on "Start Import".
5. Open `Back-end-Web-Development/server/docs/Assignment.postman_collection.json`, and import it into Postman by clicking import and dragging the file into it

### Usage

To start trying out the web, follow the steps below.

1. Make sure you have all of the dependencies installed
2. Navigate into the directory `cd Back-end-Web-Development/client`
3. Install the node_modules
```sh
npm install
```
4. Run the app.js file, ```npm run start-dev```
5. Navigate into the directory `cd Back-end-Web-Development/server`
6. Install the node_modules
```sh
npm install
```
7. Run the app.js file, ```npm run start-dev```
8. Visit `http://localhost:3001` on your web browser
9. That's all.

## License

Distributed under the Creative Commons Attribution 3.0 License. Please refer to [colorlib license](https://colorlib.com/wp/licence/). See `LICENSE` for more information.

## Acknowledgements

- [Home Page Template | Author: Joefrey | Colorlib](https://colorlib.com/wp/template/traveland/)
- [Login Page Template | Author: Aigars | Colorlib](https://colorlib.com/wp/template/login-form-v10/)
- [Error Page Template | Author: Adam Quinlan | September 14, 2018](https://freefrontend.com/500-error-page-html-templates/)
- [Img Shields](https://shields.io/)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ISnackable/Back-end-Web-Development.svg?style=flat-square
[contributors-url]: https://github.com/ISnackable/Back-end-Web-Development/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ISnackable/Back-end-Web-Development.svg?style=flat-square
[forks-url]: https://github.com/ISnackable/Back-end-Web-Development/network/members
[stars-shield]: https://img.shields.io/github/stars/ISnackable/Back-end-Web-Development.svg?style=flat-square
[stars-url]: https://github.com/ISnackable/Back-end-Web-Development/stargazers
[issues-shield]: https://img.shields.io/github/issues/ISnackable/Back-end-Web-Development.svg?style=flat-square
[issues-url]: https://github.com/ISnackable/Back-end-Web-Development/issues
[license-shield]: https://img.shields.io/github/license/ISnackable/Back-end-Web-Development.svg?style=flat-square
[license-url]: https://github.com/ISnackable/Back-end-Web-Development/blob/master/LICENSE.md
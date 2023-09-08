# File Upload API using Express.js and TypeScript

This is a simple File Upload API built with Express.js and TypeScript. It allows users to upload and serve files, such as images or documents. You can customize this API for your specific needs and use it as a foundation for building file handling features in your applications.

## Features

- Upload files (images, documents, etc.) to the server.
- Serve uploaded files to clients.
- Error handling and validation for uploaded files.
- TypeScript support for improved code quality.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your development machine.
- Basic knowledge of Express.js and TypeScript.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/BaseMax/FileUploadExpressTS.git
   ```

Navigate to the project directory:
  
  ```bash
  cd FileUploadExpressTS
  ```

Install dependencies:

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` by default. You can customize the port and other settings in the configuration files.

To upload a file, make a POST request to /upload with a multipart/form-data body containing the file to be uploaded. You can use tools like curl, Postman, or any HTTP client library to interact with the API.

Example using curl:

```bash
curl -X POST -F "file=@path/to/your/file.jpg" http://localhost:3000/upload
```

Replace `path/to/your/file.jpg` with the path to the file you want to upload.

The uploaded file will be stored on the server (the default storage location is uploads/), and you will receive a response with information about the uploaded file, including its URL.

To access the uploaded file, make a GET request to the provided URL.

## Configuration

You can customize the API's configuration by modifying the config.ts file. Here are some configuration options you can adjust:

- `UPLOAD_DIR`: The directory where uploaded files are stored.
- `PORT`: The port on which the server listens.

## Contributing

Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

Remember to replace placeholders like `http://localhost:3000` with your actual server URL and provide more specific usage instructions if needed. Additionally, update the `LICENSE` file with the appropriate license for your project.

Coypright 2023, Max Base

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
curl -X POST -F "file=@path/to/your/file.jpg" http://localhost:3000/api/file/upload (with token HEADER)
```

Replace `path/to/your/file.jpg` with the path to the file you want to upload.

The uploaded file will be stored on the server (the default storage location is uploads/), and you will receive a response with information about the uploaded file, including its URL.

To access the uploaded file, make a GET request to the provided URL.

## API Routes

| #   | Route                                       | Description                                                     | Response Example                                      |
| --- | ------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| 1   | `/api/auth/register`                        | Register a new user account.                                    | `{"message": "User registered successfully"}`         |
| 2   | `/api/auth/login`                           | User login with credentials.                                    | `{"token": "your-auth-token", "user": {...}}`         |
| 3   | `/api/auth/logout`                          | User logout.                                                    | `{"message": "User logged out successfully"}`         |
| 4   | `/api/auth/reset-password`                  | Reset user password.                                            | `{"message": "Password reset link sent"}`             |
| 5   | `/api/auth/forgot-password`                 | Forgot user password.                                           | `{"message": "Password reset email sent"}`            |
| 6   | `/api/file/upload`                          | Upload a file.                                                  | `{"message": "File uploaded successfully"}`           |
| 7   | `/api/directory`                            | Create a new directory.                                         | `{"message": "Directory created successfully"}`       |
| 8   | `/api/file/move`                            | Move a file to a different location.                            | `{"message": "File moved successfully"}`              |
| 9   | `/api/file/copy`                            | Copy a file to a different location.                            | `{"message": "File copied successfully"}`             |
| 10  | `/api/file/upload-from-link`                | Upload a file from a URL/link.                                  | `{"message": "File uploaded from link successfully"}` |
| 11  | `/api/file/search`                          | Search for files by name or metadata.                           | `[{"id": 1, "name": "file1.jpg", ...}, ...]`          |
| 12  | `/api/file/stats/:id`                       | View download statistics for a file.                            | `{"downloads": 100}`                                  |
| 13  | `/api/file/leaderboard/`                    | Get the leaderboard of hot links.                               | `[{"file": "file1.jpg", "downloads": 100}, ...]`      |
| 14  | `/api/file/:id`                             | Download a specific file by ID.                                 | (File download response)                              |
| 15  | `/api/file/:id`                             | Delete a specific file by ID.                                   | `{"message": "File deleted successfully"}`            |
| 16  | `/api/file/rename/:id`                      | Rename a specific file by ID.                                   | `{"message": "File renamed successfully"}`            |
| 17  | `/api/file/uploads`                         | View a list of user's uploaded files.                           | `[{"file": "file1.jpg", "uploads": 10}, ...]`         |
| 18  | `/api/user/profile`                         | Get user profile information.                                   | `{"id": 1, "username": "example", ...}`               |
| 19  | `/api/user/profile`                         | Update user profile information.                                | `{"message": "Profile updated successfully"}`         |
| 20  | `/api/user/change-password`                 | Change user password.                                           | `{"message": "Password changed successfully"}`        |
| 21  | `/api/user/delete-account`                  | Delete user account.                                            | `{"message": "User account deleted successfully"}`    |
| 22  | `/api/user/downloads`                       | View a list of user's downloaded files.                         | `[{"file": "file1.jpg", "downloads": 5}, ...]`        |
| 23  | `/api/user`                                 | View a list of all registered users (admin only).               | `[{"id": 1, "username": "user1", ...}, ...]`          |
| 24  | `/api/file`                                 | View a list of all files (admin only).                          | `[{"id": 1, "name": "file1.jpg", ...}, ...]`          |
| 25  | `/api/file/admin/stats/:id`                 | View statistics for a specific file (admin only).               | `{"downloads": 100}`                                  |
| 26  | `/api/admin/user-stats/:id`                 | View statistics for a specific user (admin only).               | `{"downloads": 500, "uploads": 200}`                  |
|     |
| 27  | `/api/user/:id`                             | Delete a user account (admin only).                             | `{"message": "User account deleted successfully"}`    |
| 28  | `/api/user`                                 | Create a new user account (admin only).                         | `{"message": "User created successfully"}`            |
| 29  | `/api/file/admin/:id`                       | Delete a specific file by ID (admin only).                      | `{"message": "File deleted successfully"}`            |
| 30  | `/api/admin/view-user-downloads/:id`        | View a list of a specific user's downloaded files (admin only). | `[{"file": "file1.jpg", "downloads": 5}, ...]`        |
| 31  | `/api/admin/view-user-uploads/:id`          | View a list of a specific user's uploaded files (admin only).   | `[{"file": "file1.jpg", "uploads": 10}, ...]`         |
| 32  | `/api/admin/change-user-password/:id`       | Change a user's password (admin only).                          | `{"message": "User password changed successfully"}`   |
| 33  | `/api/directory`                            | View a list of all directories (admin only).                    | `[{"id": 1, "name": "dir1", ...}, ...]`               |
| 34  | `/api/directory/view-directory-content/:id` | View the contents of a directory by ID (admin only).            | `[{"id": 1, "name": "file1.jpg", ...}, ...]`          |
| 36  | `/api/directory/view-directory-stats/:id`   | View statistics for a directory by ID (admin only).             | `{"files": 10, "subdirectories": 5}`                  |
| 37  | `/api/user/set-user-role/:id`               | Set the role of a user (admin only).                            | `{"message": "User role set successfully"}`           |

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

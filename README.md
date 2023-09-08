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
curl -X POST -F "file=@path/to/your/file.jpg" http://localhost:3000/upload (with token HEADER)
```

Replace `path/to/your/file.jpg` with the path to the file you want to upload.

The uploaded file will be stored on the server (the default storage location is uploads/), and you will receive a response with information about the uploaded file, including its URL.

To access the uploaded file, make a GET request to the provided URL.

## API Routes

| #   | Route                           | Description                                       | Response Example                                    |
| --- | ------------------------------- | ------------------------------------------------- | --------------------------------------------------- |
| 1   | `/api/user/register`            | Register a new user account.                      | `{"message": "User registered successfully"}`      |
| 2   | `/api/user/login`               | User login with credentials.                      | `{"token": "your-auth-token", "user": {...}}`    |
| 3   | `/api/user/reset-password`      | Reset user password.                               | `{"message": "Password reset link sent"}`         |
| 4   | `/api/user/forgot-password`     | Forgot user password.                              | `{"message": "Password reset email sent"}`        |
| 5   | `/api/upload`                   | Upload a file.                                    | `{"message": "File uploaded successfully"}`      |
| 6   | `/api/create-directory`         | Create a new directory.                           | `{"message": "Directory created successfully"}`  |
| 7   | `/api/move-file`                | Move a file to a different location.              | `{"message": "File moved successfully"}`          |
| 8   | `/api/copy-file`                | Copy a file to a different location.              | `{"message": "File copied successfully"}`         |
| 9   | `/api/cut-file`                 | Cut (move) a file to a different location.        | `{"message": "File cut successfully"}`            |
| 10  | `/api/upload-from-link`         | Upload a file from a URL/link.                    | `{"message": "File uploaded from link successfully"}` |
| 11  | `/api/search`                   | Search for files by name or metadata.             | `[{"id": 1, "name": "file1.jpg", ...}, ...]`      |
| 12  | `/api/view-stats/:id`           | View download statistics for a file.              | `{"downloads": 100}`                              |
| 13  | `/api/leaderboard`              | Get the leaderboard of hot links.                | `[{"file": "file1.jpg", "downloads": 100}, ...]`  |
| 14  | `/api/download/:id`             | Download a specific file by ID.                   | (File download response)                           |
| 15  | `/api/delete-file/:id`          | Delete a specific file by ID.                     | `{"message": "File deleted successfully"}`        |
| 16  | `/api/rename-file/:id`          | Rename a specific file by ID.                     | `{"message": "File renamed successfully"}`        |
| 17  | `/api/copy-file/:id`            | Create a copy of a specific file by ID.           | `{"message": "File copied successfully"}`          |
| 18  | `/api/move-file/:id`            | Move a specific file to a different location.      | `{"message": "File moved successfully"}`           |
| 19  | `/api/user/logout`              | User logout.                                      | `{"message": "User logged out successfully"}`      |
| 20  | `/api/user/profile`             | Get user profile information.                     | `{"id": 1, "username": "example", ...}`            |
| 21  | `/api/user/update-profile`      | Update user profile information.                  | `{"message": "Profile updated successfully"}`      |
| 22  | `/api/user/change-password`     | Change user password.                             | `{"message": "Password changed successfully"}`     |
| 23  | `/api/user/delete-account`      | Delete user account.                              | `{"message": "User account deleted successfully"}` |
| 24  | `/api/user/view-downloads`      | View a list of user's downloaded files.           | `[{"file": "file1.jpg", "downloads": 5}, ...]`     |
| 25  | `/api/user/view-uploads`        | View a list of user's uploaded files.             | `[{"file": "file1.jpg", "uploads": 10}, ...]`      |
| 26  | `/api/admin/view-all-users`     | View a list of all registered users (admin only). | `[{"id": 1, "username": "user1", ...}, ...]`       |
| 27  | `/api/admin/view-all-files`     | View a list of all files (admin only).           | `[{"id": 1, "name": "file1.jpg", ...}, ...]`      |
| 28  | `/api/admin/view-file-stats/:id`| View statistics for a specific file (admin only).| `{"downloads": 100}`                              |
| 29  | `/api/admin/view-user-stats/:id`| View statistics for a specific user (admin only).| `{"downloads": 500, "uploads": 200}`              |
| 30  | `/api/admin/reset-user-password/:id`| Reset a user's password (admin only).         | `{"message": "User password reset successfully"}`  |
| 31  | `/api/admin/delete-user/:id`        | Delete a user account (admin only).             | `{"message": "User account deleted successfully"}` |
| 32  | `/api/admin/view-leaderboard`        | View the leaderboard of hot links (admin only). | `[{"file": "file1.jpg", "downloads": 100}, ...]`  |
| 33  | `/api/admin/create-user`            | Create a new user account (admin only).         | `{"message": "User created successfully"}`         |
| 34  | `/api/admin/create-directory`        | Create a new directory (admin only).            | `{"message": "Directory created successfully"}`    |
| 35  | `/api/admin/move-file/:id`          | Move a specific file to a different location (admin only). | `{"message": "File moved successfully"}`     |
| 36  | `/api/admin/copy-file/:id`          | Create a copy of a specific file by ID (admin only). | `{"message": "File copied successfully"}`  |
| 37  | `/api/admin/rename-file/:id`        | Rename a specific file by ID (admin only).      | `{"message": "File renamed successfully"}`        |
| 38  | `/api/admin/delete-file/:id`        | Delete a specific file by ID (admin only).      | `{"message": "File deleted successfully"}`        |
| 39  | `/api/admin/view-user-downloads/:id`| View a list of a specific user's downloaded files (admin only). | `[{"file": "file1.jpg", "downloads": 5}, ...]`     |
| 40  | `/api/admin/view-user-uploads/:id`  | View a list of a specific user's uploaded files (admin only). | `[{"file": "file1.jpg", "uploads": 10}, ...]`      |
| 41  | `/api/admin/change-user-password/:id`| Change a user's password (admin only).       | `{"message": "User password changed successfully"}` |
| 42  | `/api/admin/view-all-directories`   | View a list of all directories (admin only).   | `[{"id": 1, "name": "dir1", ...}, ...]`           |
| 43  | `/api/admin/delete-directory/:id`    | Delete a directory by ID (admin only).         | `{"message": "Directory deleted successfully"}`    |
| 44  | `/api/admin/move-directory/:id`      | Move a directory to a different location (admin only). | `{"message": "Directory moved successfully"}` |
| 45  | `/api/admin/copy-directory/:id`      | Create a copy of a directory by ID (admin only). | `{"message": "Directory copied successfully"}` |
| 46  | `/api/admin/rename-directory/:id`    | Rename a directory by ID (admin only).         | `{"message": "Directory renamed successfully"}`    |
| 47  | `/api/admin/view-directory-content/:id`| View the contents of a directory by ID (admin only). | `[{"id": 1, "name": "file1.jpg", ...}, ...]`   |
| 48  | `/api/admin/view-directory-stats/:id`  | View statistics for a directory by ID (admin only). | `{"files": 10, "subdirectories": 5}`          |
| 49  | `/api/admin/add-user-to-directory/:id`| Add a user to a directory (admin only).       | `{"message": "User added to directory"}`           |
| 50  | `/api/admin/remove-user-from-directory/:id`| Remove a user from a directory (admin only). | `{"message": "User removed from directory"}`   |
| 51  | `/api/admin/create-directory`           | Create a new directory (admin only).            | `{"message": "Directory created successfully"}`    |
| 52  | `/api/admin/move-directory/:id`         | Move a directory to a different location (admin only). | `{"message": "Directory moved successfully"}` |
| 53  | `/api/admin/copy-directory/:id`         | Create a copy of a directory by ID (admin only). | `{"message": "Directory copied successfully"}` |
| 54  | `/api/admin/rename-directory/:id`       | Rename a directory by ID (admin only).         | `{"message": "Directory renamed successfully"}`    |
| 55  | `/api/admin/view-directory-content/:id` | View the contents of a directory by ID (admin only). | `[{"id": 1, "name": "file1.jpg", ...}, ...]`   |
| 56  | `/api/admin/view-directory-stats/:id`   | View statistics for a directory by ID (admin only). | `{"files": 10, "subdirectories": 5}`          |
| 57  | `/api/admin/add-user-to-directory/:id`  | Add a user to a directory (admin only).       | `{"message": "User added to directory"}`           |
| 58  | `/api/admin/remove-user-from-directory/:id`| Remove a user from a directory (admin only). | `{"message": "User removed from directory"}`   |
| 59  | `/api/admin/set-directory-access/:id`   | Set access permissions for a directory (admin only). | `{"message": "Access permissions updated"}`  |
| 60  | `/api/admin/view-access-control/:id`    | View access control settings for a directory (admin only). | `{"users": [{"user": "user1", "access": "read"}, ...], "groups": [{"group": "group1", "access": "write"}, ...]}` |
| 61  | `/api/admin/view-user-directories/:id` | View the directories associated with a user (admin only). | `[{"id": 1, "name": "dir1", ...}, ...]`           |
| 62  | `/api/admin/view-directory-users/:id`   | View the users associated with a directory (admin only). | `[{"user": "user1", "access": "read"}, ...]`    |
| 63  | `/api/admin/view-group-directories/:id` | View the directories associated with a group (admin only). | `[{"id": 1, "name": "dir1", ...}, ...]`           |
| 64  | `/api/admin/view-directory-groups/:id`   | View the groups associated with a directory (admin only). | `[{"group": "group1", "access": "write"}, ...]` |
| 65  | `/api/admin/add-user-to-group/:id`     | Add a user to a group (admin only).            | `{"message": "User added to group"}`               |
| 66  | `/api/admin/remove-user-from-group/:id`| Remove a user from a group (admin only).       | `{"message": "User removed from group"}`           |
| 67  | `/api/admin/add-directory-to-group/:id` | Add a directory to a group (admin only).       | `{"message": "Directory added to group"}`         |
| 68  | `/api/admin/remove-directory-from-group/:id`| Remove a directory from a group (admin only). | `{"message": "Directory removed from group"}`   |
| 69  | `/api/admin/transfer-directory-ownership/:id`| Transfer ownership of a directory to another user (admin only). | `{"message": "Directory ownership transferred"}` |
| 70  | `/api/admin/set-user-role/:id`          | Set the role of a user (admin only).          | `{"message": "User role set successfully"}`       |

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

# Travel Booking Content Management System (CMS)

This is a Travel Booking CMS built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). The CMS allows administrators to manage travel packages and customer bookings. Admins can view, update bookings, add, update, view, and delete travel packages.

## Features

- **Admin Authentication**: JWT-based login to protect the CMS and ensure only logged-in admins can access it.
- **Travel Package Management**: Admins can create, read, update, and delete travel packages.
  - Each package includes details like the destination, title, description, price, available dates, and max number of travelers.
- **Booking Management**: Admins can view customer bookings, update their statuses, and manage the booking details.
  - Each booking includes customer name, contact info, selected package, number of travelers, and booking status.
- **Admin Dashboard**: React.js dashboard for managing travel packages and bookings.
- **Frontend UI**: Displays data in tables and forms to view/update bookings and add/edit/delete/view packages.
- **Notifications**: Use **React-Toastify** for success/error notifications for CRUD operations.
- **UI Components**: Use **Shadcn UI** for elegant and modern UI components.

## Technology Stack

- **Frontend**:
  - **React.js**: Used for building the user interface and handling routing.
  - **React Router**: For routing within the app.
  - **Axios**: For making HTTP requests to the backend.
  - **React-Toastify**: For displaying notifications (success, error, info, etc.) during CRUD operations.
  - **Shadcn UI**: A modern UI kit for elegant and customizable components.
  - **TailwindCSS**: For styling the application.

- **Backend**:
  - **Node.js**: Server-side runtime environment.
  - **Express.js**: Web framework for handling routes and API requests.
  - **MongoDB**: NoSQL database for storing travel packages, bookings, and admin data.
  - **Mongoose**: ORM for interacting with MongoDB.
  - **JWT (JSON Web Token)**: Used for admin authentication.
  - **BCRYPT**: Used for hashing the password.

## Steps to Set Up and Run the Project Locally

### Clone the repository

 - git clone https://github.com/AakashRanjan07/Travel-Booking-CMS-Client.git 

### Frontend
 - cd client
 - cd travel-cms
 - npm install
 - create .env file or configure as .env.sample
 - npm run build

### Backend
 - cd server
 - cd travel-cms-backend
 - npm install
 - create .env file or configure as .env.sample
 - npm start

### IMPORTANT
 - In the frontend, bookings can be created by navigating to /bookings. As per the assignment requirements, only the admin dashboard needs to be implemented, not a user dashboard. To create bookings, the admin can manually access the /bookings route, for example: http://localhost:3000/bookings.

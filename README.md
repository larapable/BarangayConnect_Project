# Barangay Connect

"Barangay Connect", a web application system designed to serve as a central hub for communities, fostering increased civic engagement and enhancing the efficiency of our local government. Embracing cutting-edge technology, this project distinguishes itself in its unwavering commitment to local relevance and user empowerment. With this, we empower the residents of a Barangay to actively engage and collaborate, resulting in an exceptionally informed, connected, and fortified community.

# Features
* User Profile: Allows residents to create and manage their personal account, update contact information, and access their profile details.

* Request Document: Enables residents to request official documents and certificates from the barangay office, streamlining administrative tasks.

* Announcement: Provides a platform for barangay officials to post important updates, news, and announcements for the community.

* Submit Emergency Report: Allows residents to report emergencies or incidents quickly to the barangay, ensuring timely assistance and response.

* User Forum: A space for residents to engage in discussions, share ideas, ask questions, and connect with others in the community.

* Calendar: Displays upcoming community events, meetings, and important dates, helping residents stay informed and organized.

* Business Support: Offers resources and assistance for local businesses,which support services to help them grow.

* Barangay Directory: A comprehensive directory managed by the admin, where local government officials and important contact numbers are listed.

# Tech Stack

* Frontend
  + Javascript (React.js)
  + CSS
* Backend
  + Java (Springboot)
* Database
  + MySQL (Local)

# Getting Started
To get started with "Barangay Connect," follow the steps below:
### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/barangay-connect.git
```

2. Frontend Setup (React.js)
```bash
cd barangay-connect
npm install
npm start
```

3. Database Setup (MySQL)
  - Install MySQL locally and configure it.
  - Create a new database in MySQL for the project:
```bash
CREATE DATABASE dbdemo;
```
- Update your application.properties (or equivalent) file in the Spring Boot backend with the correct database connection details:
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/dbdemo
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL5InnoDBDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect
server.error.include-stacktrace=never
```
4. Access the application
* Frontend: http://localhost:3000
* Backend: http://localhost:8080 (or the configured port)

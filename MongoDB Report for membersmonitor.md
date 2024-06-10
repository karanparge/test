**MongoDB Report for membersmonitor.com** 

1. **Introduction** 

This report provides an in-depth overview of the MongoDB database implementation for our membersmonitor.com platform. It covers the installation and configuration of MongoDB on an Ubuntu server, the database connection setup, and details about the five collections used: Admin, OTP, TraineeForm, UserInfo, and VerifyEmail. This report aims to help a new user understand the database structure and the connections between the collections used in the website. 

2. **Installation and Setup** 

**Installing MongoDB on Ubuntu Server:** 

1. **Import the MongoDB Public Key:** 

   wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add - 

2. **Create a List File for MongoDB:** 

   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb- org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list 

3. **Reload Local Package Database:** 

   sudo apt-get update 

4. **Install MongoDB Packages:** 

   sudo apt-get install -y mongodb-org 

5. **Start MongoDB:** 

   sudo systemctl start mongod 

6. **Enable MongoDB to Start on Boot:** 

   sudo systemctl enable mongod 

**Solution to Installation Issues:** If you encounter issues during the installation, try the following steps: 

- **Update Package Index:** 

  sudo apt-get update sudo apt-get upgrade 

- **Ensure All Required Packages are Installed:** sudo apt-get install -y libcurl4 openssl 
- **Check the MongoDB Service Status:** 

  sudo systemctl status mongod 

- **Review MongoDB Logs for Errors:** cat /var/log/mongodb/mongod.log 
- **Restart the MongoDB Service:** 

  sudo systemctl restart mongod 

- **Reinstall MongoDB if Necessary:** 

  sudo apt-get remove mongodb-org sudo apt-get purge mongodb-org sudo apt-get autoremove 

  sudo apt-get install -y mongodb-org 

3. **Database Connection Environment Configuration (.env):** 
- Contains sensitive data and configurations such as the database connection string, email credentials, and API keys. 

**Database Connection File (dbConnection.js):** 

- Uses mongoose.connect with the connection string from the .env file to establish a connection to the MongoDB database. 

  const mongoose = require("mongoose"); require("dotenv").config(); 

  const dbConnect = () => { 

  `    `mongoose.connect(process.env.URL, { 

  `        `useNewUrlParser: true, 

  `        `useUnifiedTopology: true 

  `    `}) 

      .then(() => { 

  `        `console.log("DB connection is successful"); 

  `    `}) 

      .catch((err) => { 

  `        `console.error("Some error occurred while making the DB connection:", err.message); 

  `        `console.log("Please check if your IP is whitelisted in MongoDB Atlas.");         process.exit(1); 

  `    `}); 

  }; 

  module.exports = dbConnect; 

  **Explanation**: The database connection uses environment variables from the .env file to manage sensitive data securely. The connection string for MongoDB is specified in process.env.URL. 

4. **Database Structure and Schema** 

This section details the structure of each collection used in the website, including the schema definition and purpose. 

**Admin Collection:** 

- **Purpose**: Stores information about the website administrators. 
- **Key Fields**: name, email, photo, password, role. 

**OTP Collection:** 

- **Purpose**: Stores OTPs generated during email verification. 
- **Key Fields**: userId (reference to User), otp. 

**TraineeForm Collection:** 

- **Purpose**: Stores data about the trainees. 
- **Key Fields**: owner (reference to User), name, email, phone, dateOfBirth, gymPlan, amount, registrationDate. 

**UserInfo Collection:** 

- **Purpose**: Contains information about all users logged in to the website. 
- **Key Fields**: name, phone, email, photo, password, registrationDate, plan, isAgreeTerms. 

**VerifyEmail Collection:** 

- **Purpose**: Stores information about email verifications, including the OTPs generated for verification purposes. 
- **Key Fields**: email, otp. ![](Aspose.Words.5372ae06-9137-4e6f-9cee-bbd68d59d774.001.png)
5. **Relationships Between Collections UserInfo and OTP Relationship:** 
- **UserInfo** collection is referenced in the **OTP** collection using the userId field. 
- **Purpose**: To track which OTP belongs to which user. 

**UserInfo and TraineeForm Relationship:** 

- **UserInfo** collection is referenced in the **TraineeForm** collection using the owner field. 
- **Purpose**: To associate each trainee form with a specific user. 

**Schema References:** 

- In the **OTP** schema: 

  javascript 

  Copy code 

  userId: { 

  `    `type: mongoose.Schema.Types.ObjectId,     required: true, 

  `    `ref: 'user' 

  } 

- In the **TraineeForm** schema: 

  javascript 

  Copy code 

  owner: { 

  `    `type: mongoose.Schema.Types.ObjectId,     ref: 'user', 

  `    `required: true, 

  `    `default: '658d00b9089c300d64f08441' } 

6. **Challenges and Solutions** 

**Challenge 1**: Handling Expired OTPs 

- **Solution**: Used the expires property in the OTP schema to automatically remove expired OTPs. 

**Challenge 2**: Data Consistency Between UserInfo and OTP Collections 

- **Solution**: Implemented proper referencing and population methods to ensure data consistency and integrity. 

**Challenge 3**: Ensuring Secure Data Storage 

- **Solution**: Stored sensitive data such as passwords in a hashed format using bcrypt. 

**Challenge 4**: MongoDB Atlas Connection Issues 

- **Error**: Could not connect to any servers in your MongoDB Atlas cluster. One common reason is that you're trying to access the database from an IP that isn't whitelisted. 
- **Solution**: Check if your current IP address is on your Atlas cluster's IP whitelist:[ MongoDB Atlas Security Whitelist ](https://www.mongodb.com/docs/atlas/security-whitelist/)
- **Code**: Modified the catch block in the database connection file to provide a helpful message and exit the process if the connection fails due to 

**Challenge 5**: MongoDB Installation Failures 

- **Error**: Encountered issues during MongoDB installation on the Ubuntu server. 
- **Solution**: 
- **Update Package Index**: 

  sudo apt-get update sudo apt-get upgrade 

- **Ensure All Required Packages are Installed**: sudo apt-get install -y libcurl4 openssl 
- **Check the MongoDB Service Status**: 

  sudo systemctl status mongod 

- **Review MongoDB Logs for Errors**: 

  cat /var/log/mongodb/mongod.log 

- **Restart the MongoDB Service**: 

  sudo systemctl restart mongod 

- **Reinstall MongoDB if Necessary**: 

  sudo apt-get remove mongodb-org sudo apt-get purge mongodb-org sudo apt-get autoremove 

  sudo apt-get install -y mongodb-org 

This addition addresses the challenge of encountering issues during MongoDB installation and provides steps to troubleshoot and resolve them. 

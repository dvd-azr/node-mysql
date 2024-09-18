# # Use a base image with NodeJS 18
# FROM node:18

# # Install all the dependencies in the container using the package.json file
# COPY package.json .
# RUN npm install

# # Copy the remaining project files to the container
# COPY . .
# # COPY .env.example .env

# # Expose the application port
# EXPOSE 8080

# # Run the App
# CMD npm start


# ========================================================
FROM node:20
WORKDIR /app
# copy only package.json & package-lock.json to install the production dependencies
# COPY package*.json .


# copy all files in the project
COPY . .
RUN npm install

# please modify the port if you wish another PORT
EXPOSE 80

CMD [ "npm", "start" ]
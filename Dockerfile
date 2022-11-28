# STAGE 1: Set up the build environment
FROM mcr.microsoft.com/windows/servercore:ltsc2016 as installer

SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop';$ProgressPreference='silentlyContinue';"]

RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/v16.17.0/node-v16.17.0-x64.msi"; ` \
Expand-Archive nodejs.zip -DestinationPath C:\; ` \
Rename-Item "C:\\node-v16.17.0-win-x64" c:\nodejs

WORKDIR C:/nodejs
COPY --from=installer C:/nodejs/ .
RUN SETX PATH C:\nodejs
RUN npm config set registry https://registry.npmjs.org/

# Stage 3: Build Web App

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY package.json package-lock.json ./

# Install all the dependencies and build the application
RUN npm install --force

# Install global angular cli
RUN npm install -g @angular/cli@latest

# Copy the source from the current directory to the working Directory inside the container
COPY . .

# Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build --prod

# Stage 4: Serve app with nginx server
FROM nginx:1.15.8-alpine

COPY --from=builder /usr/src/app/dist/SGC-PAGE/ /usr/share/nginx/html


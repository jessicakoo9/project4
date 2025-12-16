# Deployment Instructions
This project is deployed using Vercel and GitHub.

## Prerequisites
- A GitHub account
- A Vercel account
- Node.js installed locally

## Deployment Steps
1. Push the project repository to GitHub.
2. Log in to Vercel.
3. Click "New Project" and import the GitHub repository.
4. When prompted, use the default build settings.
5. Vercel automatically detects the Node.js backend and deploys the project.
6. The application is built and deployed, and a live URL is generated.

## Project Structure
- Front-end files are located in the `public/` directory.
- Back-end REST API is implemented using Express in `api/index.js`.

## Live Deployment
The application is live and accessible at:

https://project4-ten-xi.vercel.app 

## Notes
- Vercel automatically redeploys the application when changes are pushed to the main branch.
- Both the front-end and back-end are deployed together as a single project.

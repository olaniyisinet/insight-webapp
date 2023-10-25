# insights-web-app

## Prerequisite

* Node.js version v18.16.0
* Yarn version 1.22.19

## Getting Stated

* Download from the git repository
* Run the command  'yarn install'
* Run the command  'yarn dev'
* Access the test system via http://localhost:5173/


## Build and Deploy

* Run the command 'yarn build', This will generate the deployable static files in the <project-root>/dist directory
* Run the command 'yarn preview' to test the generated files. This will create a temparary web server and serve the above generated static files via http://localhost:4173/
* Deploy the static content to the relevent S3 bucket in AWS
* Invalidate the "index.html" file in the relevant CloudFront distribution
//Currently this fine is a js filter
//if this code is to be pushed to GIT,
     //1) Node Modules will be ignored for middleware as well as UI
     //2) This JS file would have been commited as a README.md file

//This project has three parts - each having its own package.json
   //1) Pushing the RAW data to a Local MySQL RDBMS database
         //a) This happens using the code in Folder "rawDataUpload"
         //b) In this folder, the JS file uploadJsonData.js has been used to push json data into a
         //local MySQL database set up in my localhost
   //2) Pulling the tabular form data from Local MySQL RDBMS database and sending it as a response
   //to HTTP get request 'http://localhost:3000/'
         //a) This happens using the code in Folder "processedDataDownload"
         //b) In this folder, the JS file getRiskData.js has been used to host a service URL
         //using Node JS
         //c) This was done using Express Module
   //3) Hitting the service URL to get Risk data and showing it to USER using a Sensible visualization
         //a) This happens using the code in Folder "riskSenseUI"
         //b) In this folder, a Bubble/scatter plot has been created using "React", "Redux", and "redux saga"
         //c) For Chart, a library in react  - called react vis developed by Uber is pushed
         //d) basically, react has been used to built visualization where state is managed by Redux using store
         //and API calls managed my Redux saga [ using generator functions]
         //e) Even though, I have tried to follow the folder structure of react boiler, this app was created suing
         //create react app
         //f) Each container will have its own reducer, actions, selectors, constants
         //g) This would ease the scalling up of the app in a smooth way

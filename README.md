<h1> Sonar Bot v1.0.0 </h1>

<h2> Automatically create a sonar project for each folder created in the sonar-bot project root 🤖 </h2>

<h3> Pre requisites </h3>
1 - This solution only works on linux systems for now. If you are a Windows user, You must configure WSL.
<br>
2 - You must install and configure PostgresDB.
<br>
3 - You must install and configure SonarQube.
<br><br>
I will help you. You can find easy  <b><a href="https://cigdemkadakoglu.medium.com/sonarqube-installation-on-ubuntu-20-04-with-community-branch-plugin-53e20cbded08"> PostgresDb and Sonarqube intallation and configuration Here!</a></b>


<h3> Step 1 - Pre configuration </h3>

1 - clone this project

2 - create a folder "directories" in the root running this command ``` $ mkdir directories ```

3 - rename "env-example.env" file to ".env"

3.1 - create a new user with admin privillege in your sonarqube dashboard

3.2 - change .env file informations with your admin and new user informations.

4 - run on your terminal ```$ npm start ```
## Github repository for example

## Pre-requisite(s)

The only prerequisite of running SonarQube is to have Java (Oracle JRE 8 or OpenJDK 8) installed on your machine .`https://docs.sonarqube.org/display/SONAR/Requirements`

2GB of RAM to run efficiently and 1GB of free RAM for the OS

## Download below software(s):

1. Download.(recommend use LTS version)
   `https://www.sonarqube.org/downloads/`
2. SonarQube-scanner based on your platform.
   `https://docs.sonarqube.org/latest/analysis/scan/sonarscanner/`
   Download suitable sonar-scanner base on your OS

## Set up enviroment variable for sonarqube server and sonarscanner 
1. Adding {Sonarqube's download location}/bin/{your suitable OS} in %PATH% variable
2. Adding {SonarScanner's download location}/bin in %PATH% variable 
3. Restart your PC

## Start the sonarqube server:
1. If you haven't set up enviroment variable
    Go to SonarQube's downloaded location, cd bin and choose your OS:

    MacOs, Linux:

    ```
        sonar.sh --start
    ```

    - Windows:

    ```
        start StartSonar.bat
    ```
   Once your instance is up and running, Log in to http://localhost:9000 using System Administrator credentials:
   ```
      login: admin
      password: admin
   ```

2. If you have already set up environment variable

   go to command prompt, run command 
   ```
   StartSonar
   ```
## Analyzing a new project

1. Click the **Create new project** button.
2. Give your project a Project key and a Display name and click the Set Up button.
3. Under Provide a token, select **Generate a token**. Give your token a name, click the **Generate** button, and click **Continue**.
4. Select your project's main language under Run analysis on your project, and follow the instructions to analyze your project. 
5.Setup and run sonar-scanner in your project. 
## Steps to setup the sonarqube properites configuration

1. Once `SonarQube-scanner` is downloaded, add below two properties in `sonar-scanner.properties`:

   ```
   #----- Default SonarQube server
   sonar.host.url=http://localhost:9000

   #----- Default source code encoding
   sonar.sourceEncoding=UTF-8
   ```
2. Create a `sonar-project.properties` file in root location of your nodejs app.

3. Add following configuration in the above created properties file:

   ```
   # required metdata
   sonar.projectKey=<preferrable_node_app_name>
   sonar.projectVersion=<version>
   sonar.sourceEncoding=<source code encoding>

   # path to srouce directories
   sonar.sources=<your_node_app_folder_name>

   # excludes
   sonar.exclusions=<files or folder which you want to exclude>

   # coverage reporting
   sonar.javascript.lcov.reportPaths=<code coverage location>
   ```

   `Note:` These are required for sonar-scanner to analyaze and generate the report accordingly.

   ### Example:
   ```
         sonar.projectKey=test-sonarqube
         sonar.projectVersion=<version>
         sonar.sourceEncoding= UTF-8

         # path to srouce directories
         sonar.sources= src

         #  excludes
         # sonar.exclusions=<files or folder which you want to exclude>

         # coverage reporting
         # sonar.javascript.lcov.reportPaths=<code coverage location>
         sonar.javascript.lcov.reportPaths= coverage/lcov.info

         sonar.host.url=http://127.0.0.1:9000
         sonar.login = sqp_2639994204927720b0d7af012c501513afea2a31
         sonar.tests = test
         sonar.testExecutionReportPaths = coverage/sonar-report.xml
   ```
## Run the sonar-scanner

    Got to root directory of your project folder where you have created the `sonar-projects.properties` file and run the below command:
   ```
    ~<root path of your project> $ sonar-scanner
   ```
   
   `Note:` if you haven't set up sonarscanner in enviroment variable: 
   ```
      ~<root path of your project>\{SonarScanner's download location}\bin\sonar-scanner
   ```   
   `Note:` if sonar-scanner asking for login, adding **-Dsonar.login="{your-generated-token}"** in your command
            or you can add in in sonar-projects.properties file that you have created before, so next time just run sonar-scanner

## Challenge(s) faced:

1. In Windows - bash: sonar-scanner: command not found
   \*\* Resolution: Update the PATH environment variable and re-run the command.
   Steps:

   - Navigate to control panel.
   - Search `enviornment` keyword from the right-top search bar.
   - Click on the `Edit the system environment variables`.
   - Click on `Enviornment Variables`.
   - Look for `Path` environment variable.

   In Mac - bash: sonar-scanner: unknownd command
   \*\* Resolution: Update the path environment variable by exporting it and ensure that the same has been updated in the environment path. and re-run the command.
   Steps to set an environment variable: [Link](https://apple.stackexchange.com/questions/106778/how-do-i-set-environment-variables-on-os-x)

   **Note:** `sonar-scanner` command must be executed from the path where `sonar-project.properties` file is added.
   (
   if don't have sonar-project.properties, we must declare variables by adding -Dsonar in command
   Ex: sonar-scanner.bat -D"sonar.projectKey=chess-web" -D"sonar.sources=." -D"sonar.host.url=http://127.0.0.1:9000" -D"sonar.login=sqp_611b0a0456e23664831fbc2737ad8461989a0c1f"
   )

2. 'nyc' is not recognized as an internal or external command (In Windows)
   \*\* Resolution: Follow the below steps to fix:

   - Remove the node_modules
   - Re-run the `npm install` command from the app folder.
   - You should see the expected output.

3. Code coverage is not being displayed in the Sonarqube dashboard.
   \*\* Resolution:
   - We need to ensure that the coverage is generated in the lcov format.
   - Run `npm run coverage-lcov` command. As a result it generates the coverage in the lcov format and same can be seen from <project_root_path>/app/coverage/lcov-report
   - Re-reun the `sonar-scanner` command from the path where `sonar-project.properties` file is defined/added. This generates the analysis report.
   - Navigate to the `sonarqube` dashboard you should see the `coverage` statistics.
4. Test execution is not displayed true in the Sonarqube dashboard.
   \*\* Resolution:
   - We need to ensure that we have had sonar.test in sonar-project.properties file
   - Ensure that sonar.test has correctly path to your project test
   - Adding sonar.testExecutionReportPaths = {your execution test (notice the file extension (xml))}
   ```
      sonar.tests = test
      sonar.testExecutionReportPaths = coverage/sonar-report.xml
   ```

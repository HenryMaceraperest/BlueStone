# BlueStone Application

This is an application for product management. In addition (there isn't but will be) a product stock, and product orders feature.

## About 

BlueStone is an application that utilizes an Angular for the front-end. I have also added Microsoft Entra ID / Default Directory for authorization. 
The back-end is based on ASP.NET - utilizing .NET 8 and C# 12.0.
The back-end also uses Serilog to log any errors that come up in a separate file under Logs/date.txt.
To use the application, you need an Azure account - you need to set up Microsoft Entra ID there.

## Getting Started

### Dependencies

I recommend using Visual Studio 2022 for development - this is what I am using.

For the front-end you need: Node Package Manager (NPM), I have 10.5.0  installed. 
These are the node packages used/dependencies:

+-- @angular-devkit/build-angular@18.0.3

+-- @angular/animations@18.0.2

+-- @angular/cli@18.0.3

+-- @angular/common@18.0.2

+-- @angular/compiler-cli@18.0.2

+-- @angular/compiler@18.0.2

+-- @angular/core@18.0.2

+-- @angular/forms@18.0.2

+-- @angular/platform-browser-dynamic@18.0.2

+-- @angular/platform-browser@18.0.2

+-- @angular/router@18.0.2

+-- @azure/msal-angular@3.0.19

+-- @azure/msal-browser@3.16.0

+-- @ng-bootstrap/ng-bootstrap@16.0.0

+-- @types/jasmine@5.1.4

+-- jasmine-core@5.1.2

+-- jest-editor-support@32.0.0-beta.1

+-- karma-chrome-launcher@3.2.0

+-- karma-coverage@2.2.1

+-- karma-jasmine-html-reporter@2.1.0

+-- karma-jasmine@5.1.0

+-- karma@6.4.3

+-- run-script-os@1.1.6

+-- rxjs@7.8.1

+-- tslib@2.6.3

+-- typescript@5.4.5

`-- zone.js@0.14.7 

For the back-end, the NuGet top-level packages I have installed are:

Microsoft.AspNetCore.Authentication 6.0.31

Microsoft.AspNetCore.SpaProxy 8.0.6

Microsoft.EntityFrameworkCore 8.0.6

Microsoft.EntityFrameworkCore.SqlServer 8.0.6

Microsoft.EntityFrameworkCore.Tools 8.0.6

Microsoft.Identity.Web 2.19.0

Microsoft.Identity.Web.UI 2.19.0

Serilog 4.0.0

Serilog.Extensions.Hosting 8.0.0

Serilog.Sinks.Console 6.0.0

Serilog.Sinks.File 5.0.0

Swasbuckle.AspNetCore 6.4.0


### Changes

As mentioned previously, this app uses Microsoft Entra ID, so in order to use it, you should first change the client/src/environments/environment.ts file variables.
Specifically the auth clientId and authority. These need to match your details in Azure App registrations.

Currently there isn't any specific scopes used, but in the future updates, when they get added, you should also change the scopes to match yours.

In the back-end, you should also change the appsettings.json. There are the AzureAd variables, but I haven't implemented back-end validation yet so it won't do anything. Otherwise, you should still change all the tentantIDs, ClientIds and domains to match your application.
Besides that, there is the DatabaseConnection that you should change the string to match your database connection string.

### Executing program

#### 1. Clone the Repository
Use 'git clone https://github.com/HenryMaceraperest/BlueStone.git' to clone the repository to your local machine.

#### 2. Open the solution in Visual Studio

#### 3. Restore the NuGet packages
Right click on the solution and select 'Restore NuGet Packages' to ensure all the packages are installed properly.

#### 4. Install Node Modules
You should have NPM installed at this point. In gitbash or the Developer PowerShell in Visual Studio, navigate to the client project directory.
Run 'npm install --legacy-peer-deps'.

#### 5. Check Start-up Projects
Make sure that both the client and server applications are set as start-up projects to run.
You can check this in Solution Properties -> Common Properties -> Startup Project. Choose Multiple startup projects and both the cliend and server action to Start. 

#### 6. Build the Solution & Run the application
Just to make sure that everything is working as intended.

#### 7. Initialize the database
After setting your database access string and validating that everything works, you can initialize it by opening the Package Manager Console and running 'Add-Migration "Initialize Any Description Is Fine"'. This scaffolds a new migration based on the given models.
Check out the migration file to see if everything looks fine. If it looks good, then run 'Update-Database'. This will apply the migration to the database.

#### 8. Test the Application
At this point you should now have everything properly set up and you can test if all the api endpoints get reached and everything works as intended.

#### 9. If something goes wrong/errors
You can check the logs in Logs/day.txt - all the back-end errors are there and you can check what went wrong.


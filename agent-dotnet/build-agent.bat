@echo off
echo Building WorkView Agent for easy deployment...

:: Build the agent
dotnet build --configuration Release

:: Publish single-file executable
dotnet publish --configuration Release --runtime win-x64 --self-contained true --output dist

:: Copy to deployment folder
if not exist "deployment" mkdir deployment
copy "dist\WorkView.Agent.exe" "deployment\"
copy "dist\appsettings.json" "deployment\"

echo.
echo ========================================
echo WorkView Agent built successfully!
echo ========================================
echo.
echo To deploy on any computer:
echo 1. Copy the 'deployment' folder to target computers
echo 2. Run: WorkView.Agent.exe
echo 3. No additional setup required!
echo.
echo The agent will automatically:
echo - Connect to: http://10.15.115.120:5000
echo - Use Windows username as employee ID
echo - Start monitoring and sending data
echo.
echo Press any key to continue...
pause > nul
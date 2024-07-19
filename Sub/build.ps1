param([string]$buildOutputDirectory = "buildoutput\apps")

#Helper script for CI Builds 
#moves dist to a directory the CI Build Process will automatically pickup for versioning/packaging

$appOutputDirName = "frontend"

Write-Output "Running CI Build Process..."

#run the nuxt build
&"npm" "run" "test"

&"npm" "run" "build"

#copy the output to the buildoutput dir
Copy-Item dist\ ..\buildoutput\apps\$appOutputDirName\$appOutputDirName -Recurse

Write-Output "Completed Successfully."

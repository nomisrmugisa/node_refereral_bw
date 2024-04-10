@echo off
setlocal

REM Set the service name
set "SERVICE_NAME=ICD-API"

REM Check if the service process is running
tasklist /FI "SERVICES eq %SERVICE_NAME%" | find "%SERVICE_NAME%"

:end


@ECHO OFF
SETLOCAL ENABLEEXTENSIONS
SETLOCAL DISABLEDELAYEDEXPANSION

REM do something

set CURDIR=%~dp0
set CURDIRDOUB=%CURDIR:\=\\%
set BUILD_ARGS=%*

if '%1' == '' echo Usage: predeploy.bat LANGUAGE. For example predeploy.bat ENU
if '%1' == '' goto :done

set LANG=%1



copy %CURDIR%\predeploy.htm %CURDIR%\..\public\%LANG%


set JSFILE=%CURDIR%\predeploy.js
set ORIGSTRING=\\Predeploy.htm
set NEWSTRING=%CURDIRDOUB%..\\PUBLIC\\%LANG%\\Predeploy.htm
set NEWFILE=%CURDIR%\..\public\%LANG%\predeploy.js

for /f "tokens=1,* delims=]" %%A in ('"type %JSFILE% |find /n /v """') do (
    set "line=%%B"
    if defined line (
        call set "line=echo.%%line:%ORIGSTRING%=%NEWSTRING%%%"
        for /f "delims=" %%X in ('"echo."%%line%%""') do %%~X >> %NEWFILE%
    ) ELSE echo. >> %NEWFILE%
)

wscript %NEWFILE%

:done

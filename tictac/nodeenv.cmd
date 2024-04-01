@echo off
echo Setting Node.js paths
set HOMEDRIVE=d:
set HOMEPATH=\tictac
set HOME=%HOMEDRIVE%%HOMEPATH%
md %HOME%
echo Home is set to %HOME%
%HOMEDRIVE%
cd %HOMEPATH%
set PATH=%PATH%;%HOME%\tools
call node-v21.6.1-win-x64\nodevars
echo npm version:
cmd /k npm --version
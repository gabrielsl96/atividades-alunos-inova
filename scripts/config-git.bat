@echo off
setlocal

title Configuracao Git e GitHub

echo.
echo ========================================
echo       CONFIGURACAO DO GIT
echo ========================================
echo.

:: Verifica Git
where git >nul 2>&1
if errorlevel 1 (
    echo ERRO: Git nao encontrado.
    echo.
    echo Instale o Git antes de continuar.
    echo https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

:: Verifica SSH
where ssh-keygen >nul 2>&1
if errorlevel 1 (
    echo ERRO: ssh-keygen nao encontrado.
    echo.
    echo O OpenSSH Client nao esta instalado neste computador.
    echo.
    pause
    exit /b 1
)

:: Nome
set /p GIT_NAME=Digite seu nome: 

if "%GIT_NAME%"=="" (
    echo.
    echo ERRO: O nome nao pode ficar vazio.
    pause
    exit /b 1
)

:: Email
set /p GIT_EMAIL=Digite seu e-mail: 

if "%GIT_EMAIL%"=="" (
    echo.
    echo ERRO: O e-mail nao pode ficar vazio.
    pause
    exit /b 1
)

:: Configura Git
git config --global user.name "%GIT_NAME%"
git config --global user.email "%GIT_EMAIL%"

echo.
echo Git configurado com sucesso.
echo.

:: Pasta SSH
if not exist "%USERPROFILE%\.ssh" (
    mkdir "%USERPROFILE%\.ssh"
)

set "SSH_KEY=%USERPROFILE%\.ssh\id_ed25519"
set "SSH_PUB=%USERPROFILE%\.ssh\id_ed25519.pub"

:: Verifica se ja existe chave publica
if exist "%SSH_PUB%" goto MOSTRAR_CHAVE

:: Se existe chave privada, tenta gerar a publica
if exist "%SSH_KEY%" (
    echo Foi encontrada uma chave privada existente.
    echo.
    echo Gerando a chave publica...
    
    ssh-keygen -y -f "%SSH_KEY%" > "%SSH_PUB%"

    if exist "%SSH_PUB%" goto MOSTRAR_CHAVE

    echo.
    echo ERRO: Nao foi possivel obter a chave publica.
    pause
    exit /b 1
)

:: Cria nova chave
echo.
echo ========================================
echo       CRIACAO DA CHAVE SSH
echo ========================================
echo.
echo Quando aparecer:
echo.
echo Enter passphrase (empty for no passphrase):
echo.
echo Pressione ENTER.
echo.
echo Depois aparecera:
echo.
echo Enter same passphrase again:
echo.
echo Pressione ENTER novamente.
echo.

ssh-keygen -t ed25519 -C "%GIT_EMAIL%" -f "%SSH_KEY%" -N ""

if not exist "%SSH_PUB%" (
    echo.
    echo ERRO: A chave publica nao foi criada.
    echo.
    pause
    exit /b 1
)

:MOSTRAR_CHAVE

echo.
echo ========================================
echo       SUA CHAVE PUBLICA SSH
echo ========================================
echo.

type "%SSH_PUB%"

echo.
echo.
echo ========================================
echo.
echo COPIE A LINHA ACIMA E COLE NO GITHUB.
echo.
echo GitHub:
echo Settings ^> SSH and GPG keys ^> New SSH key
echo.
echo ========================================
echo.
echo Configuracao do Git:
echo.
echo Nome : 
git config --global user.name
echo Email:
git config --global user.email
echo.

pause
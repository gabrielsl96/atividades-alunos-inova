$GitName = Read-Host "Nome para o Git"
$GitEmail = Read-Host "E-mail para o Git"

git config --global user.name "$GitName"
git config --global user.email "$GitEmail"

$KeyPath = "$env:USERPROFILE\.ssh\id_ed25519"
$PubKeyPath = "$KeyPath.pub"

if (!(Test-Path $PubKeyPath)) {
    Write-Host "Gerando chave SSH..."
    ssh-keygen -t ed25519 -C $GitEmail -f $KeyPath -N ""
}

Write-Host ""
Write-Host "===== CHAVE SSH PARA O GITHUB =====" -ForegroundColor Green
Get-Content $PubKeyPath
Write-Host "===================================" -ForegroundColor Green

Write-Host ""
Write-Host "Configuração do Git:"
git config --global user.name
git config --global user.email
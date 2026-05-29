# QuizAI — GitHub-қа жіберу (бір рет gh auth login орындағаннан кейін)
$ErrorActionPreference = "Stop"
$git = "C:\Program Files\Git\bin\git.exe"
$gh = "C:\Program Files\GitHub CLI\gh.exe"
Set-Location $PSScriptRoot

& $gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Алдымен: gh auth login" -ForegroundColor Yellow
    exit 1
}

& $git branch -M main
& $gh repo create quizai-ui --public --source=. --remote=origin --push
Write-Host "Дайын!" -ForegroundColor Green

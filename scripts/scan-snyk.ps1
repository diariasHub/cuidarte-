# Análisis de vulnerabilidades de dependencias con Snyk (local).
# Requiere: npm install -g snyk ; snyk auth
Push-Location BACKEND
snyk test --severity-threshold=high
$backend = $LASTEXITCODE
Pop-Location

Push-Location FRONTEND
snyk test --severity-threshold=high
$frontend = $LASTEXITCODE
Pop-Location

if ($backend -ne 0 -or $frontend -ne 0) {
  Write-Host "Snyk encontró vulnerabilidades (severidad high o superior)." -ForegroundColor Yellow
  exit 1
}

# Análisis dinámico (DAST) con OWASP ZAP Baseline contra el entorno local.
# Requiere Docker Desktop y la aplicación levantada (Vite en el puerto 5173).
docker run --rm -v "${PWD}:/zap/wrk:rw" `
  ghcr.io/zaproxy/zaproxy:stable `
  zap-baseline.py -t http://host.docker.internal:5173 -r zap-report.html
# El informe zap-report.html se genera en la raíz; no se versiona (ver .gitignore).

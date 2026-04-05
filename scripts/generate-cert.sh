#!/bin/bash
# Generate a self-signed certificate for local HTTPS development
# Usage: ./scripts/generate-cert.sh
# Output: cert.pem and key.pem in project root

cd "$(dirname "$0")/.."

openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/CN=localhost" \
  -addext "subjectAltName=DNS:localhost,IP:127.0.0.1"

echo ""
echo "Generated cert.pem and key.pem"
echo "Start the server normally — HTTPS will be enabled automatically."
echo "Note: browsers will show a security warning for self-signed certs."
echo "In Chrome, type 'thisisunsafe' on the warning page to bypass."

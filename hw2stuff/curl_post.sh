# doesn't work with powershell even with curl installed and curl alias for Invoke-WebRequest removed
# works with git bash
echo "Adding a location to favorite"
curl -d '{"name":"North Carolina, Durham", "zip":"27708"}' \
     -H "Content-Type: application/json" \
     -X POST \
     http://localhost:3000/favorites

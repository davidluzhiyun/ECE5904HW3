# doesn't work with powershell
# git bash gives better behavior but stil can't handle the \n escape so I removed that
echo "Listing all favorites"
curl -H "Content-Type: application/json" \
     -X GET \
     http://localhost:3000/favorites

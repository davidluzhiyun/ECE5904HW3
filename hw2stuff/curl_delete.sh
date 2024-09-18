# please use git bash
echo "Delete favorite location"
curl -H "Content-Type: application/json" \
     -X DELETE \
     http://localhost:3000/favorites/27708

# please use git bash
curl -d '{"foo":"Durham, North Carolina", "bar":"27708"}' \
     -H "Content-Type: application/json" \
     -X POST \
     http://localhost:3000/favorites

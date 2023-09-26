export default {
  'GET /healthcheck': require('./get-healthcheck'),
  'GET /persons': require('./get-persons'),
  'GET /person/:id': require('./get-person-by-id'),
  'POST /person': require('./post-person'),
  'DEL /person': require('./delete-person'),
}
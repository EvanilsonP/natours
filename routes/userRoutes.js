const express = require('express');
const app = express();



app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users').get(getUser).patch(updateUser).delete(deleteUser);
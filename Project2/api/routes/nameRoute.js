const express = require('express');
const { AddUser, FindAllUsers,FindSinglUser, UpdateUser, DeleteUser,paginate } = require('../controllers/nameController');
const router = express.Router()


/* add user */
router.post('/addusers', AddUser)

/* find all users */
router.get('/users', FindAllUsers)

/* find single user */
router.get('/users/:id', FindSinglUser)

/* add user */
router.put('/users/:id', UpdateUser)
/* add paginate user */

router.get("/paginate", paginate 
)
/* add user */
router.delete('/users/:id', DeleteUser)

module.exports = router;
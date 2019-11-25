const express = require('express');
const lodash = require('lodash');
const router = express.Router();


let users = [];

/* GET users listing. */
router.get('/', (req, res) => {
    res.status(200).json({ 
      users: users 
  });
});

/* GET one user. */
router.get('/:id', (req, res) => {
  const id = req.params.id;

  const userSelected = lodash.find(users, ["id", id]);
  console.log("id", id, userSelected);
  res.status(200).json({ 
    message: 'User found',
    user: userSelected
  });

});

/* Put new user. */
router.put('/', (req, res) => {
  const {user} = req.body;

  const id = lodash.uniqueId();

  users.push({ user, id});

  res.json ({
    message: `Just added ${id}`,
    user: {user, id}
  });
});

// Update user. 
router.post('/:id', (req,res) => {
  const id = req.params.id;
  const { user } = req.body;

  const userToUpdate = lodash.find(users, ["id", id]);

  userToUpdate.user = user;

  res.status(200).json ({
    message: `Hey le user ${userToUpdate.id} a été modifié`,
    user: users
  });
});

/* Delete specific user. */
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  lodash.remove(users, ["id", id]);


  res.status(200).json({ 
    message: `Hey, le user #${id} a été supprimé`,
    users: users 
});
});

module.exports = router;

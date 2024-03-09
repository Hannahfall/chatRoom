const { register, login, setAvatar, getUsers } = require('../controllers/userController');

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getUsers/:id", getUsers);

module.exports = router;
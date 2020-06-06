const { Router } = require('express');

const { UserController } = require('../controllers');

const router = Router();

router.post('/profile-picture', UserController.updateProfilePicture);

module.exports = router;
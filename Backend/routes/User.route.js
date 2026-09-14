const { 
  UserSignup, 
  UserLogin, 
  getAllUsers, 
  deleteUser, 
  updateUserRole 
} = require('../controller/User.controller');
const { verifyToken, isAdmin } = require('../middleware/AuthMiddleware');

const router = require('express').Router();

router.post('/signup', UserSignup);
router.post('/login', UserLogin);

// Admin user management routes
router.get('/users', verifyToken, isAdmin, getAllUsers);
router.delete('/users/:id', verifyToken, isAdmin, deleteUser);
router.put('/users/:id/role', verifyToken, isAdmin, updateUserRole);

module.exports = router;
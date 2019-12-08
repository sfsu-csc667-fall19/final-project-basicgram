const { check } = require("express-validator");

// express validator used to validate registration form input
module.exports.validateReg = () => [

	// check input field conditions, returns the corresponding message if conditions not met
    check('fullName', 'Name must contain only letters & spaces, and be 2-16 characters long.').exists().matches(/^[a-z ]+$/i).isLength({ min: 2, max: 16 }),
    check('userName', 'Username must contain only letters & numbers, and be 3-16 characters long.').exists().isAlphanumeric().isLength({min: 3, max: 16}),
	check('email', 'Invalid email address.').exists().isEmail(),
	check('password', 'Password must only be 6-20 characters long.').exists().isLength({ min: 6, max: 20 }),

];
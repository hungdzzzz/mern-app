const express = require("express");
const {register,signin,userdata,getAllUser,paginate }= require("../controllers/authController");
const router = express.Router();

//CREATE A USER
router.post("/register", register)

router.post("/signin", signin)
	router.post("/userdata", userdata
)
	router.get("/user", getAllUser
)
router.get("/paginate", paginate 
)


module.exports = router;

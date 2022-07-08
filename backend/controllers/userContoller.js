const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const createUser = asyncHandler(async (req, res) => {
  const { userName, Password, Role } = req.body;
  // checking if admin sent the request
  if (!req.user || req.user.Role != "Admin") {
    res.status(401);
    throw new Error("Not Authorized");
  }
  //check if user exists
  const hasUser = await User.findOne({ userName: userName });
  if (hasUser) {
    res.status(409);
    throw new Error(`User with user name ${userName} exists`);
  }
  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(Password, salt);

  // create the user
  const createdUser = await new User({
    userName: userName,
    Password: hashedPassword,
    Role: Role,
  }).save();
  // send the new created with jason webtoken
  res.status(201).json({
    _id: createdUser._id,
    userName: createdUser.userName,
    Role: createdUser.Role,
  });
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { userName, Password } = req.body;
  const currentUser = await User.findOne({ userName: userName }).select(
    "-Passowrd"
  );
  if (currentUser && (await bcrypt.compare(Password, currentUser.Password))) {
    const token = generateToken(currentUser._id, currentUser.Role)
    res
      .status(201)
      .setHeader("set-cookie", `access_token=${token}; path=/; HttpOnly; secure; sameSite=None Domain=.localhost:4200 `)
      .json({
        _id: currentUser._id,
        userName: currentUser.userName,
        Role: currentUser.Role,
      });
  } else {
    res.status(404);
    throw new Error("Incorrect User name and Password");
  }
});

const verifyToken = (req, res) => {
  let token;
  if (req.cookies.access_token) {
    try {
      token = req.cookies.access_token;
      jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ id: token.id, Role: token.role });
    } catch (err) {
      res.status(401);
      throw new Error("could not verify, Token has expired");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("could not verify token");
  }
};

const logout = (req,res)=>{
  console.log("here")
  res.clearCookie("access_token").status(200).json(false)

}

// generates a JWT for a give user with its _id and role as payload
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = { verifyToken, loginUser, createUser, logout };

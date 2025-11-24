import { prismaClient } from "../routes/index.js";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

//Register
export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const alreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (alreadyExists) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: hashSync(password, 10),
      },
    });

    return res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
   console.error("REGISTER ERROR:", error);
   return res.status(500).json({
      message: "Server error",
      error: error.message
   });
}

};

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;
let refreshTokens = [];

//Login

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordCorrect = compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Password" });
  }

  const accessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "2m",
  });
  const refreshToken = jwt.sign({ id: user.id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });

  // Store refresh token (in DB ideally, here in memory for testing)
  refreshTokens.push(refreshToken);
  console.log(refreshTokens)

  return res.status(200).json({
    message: "User logged in successfully",
    accessToken,
    refreshToken,
    user,
  });
};

export const RefreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });
  if (!refreshTokens.includes(refreshToken))
    return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const user = jwt.verify(refreshToken, REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "2m",
    });

    return res.status(200).json({
      message: "New access token issued",
      accessToken: newAccessToken,
    });
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};

//Get User

export const GetUserController = async (req, res) => {
  const user = await prismaClient.user.findFirst({
    where: {
      id: req.user.id,
    },
  });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.status(200).json({
    message: "User retrieved successfully",
    user,
  });
};

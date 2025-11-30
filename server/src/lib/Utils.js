//Author - shashank

import jwt from "jsonwebtoken";

//Funtion to generate and store the user's authentication in cookies
export const GenrateToken = (userId, res) => {
  const key = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, key, {
    expiresIn: "7d",
  });

  //storing data in browser cookies
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

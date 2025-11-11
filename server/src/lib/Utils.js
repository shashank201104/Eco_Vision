import jwt from "jsonwebtoken";
export const GenrateToken = (userId, res) => {
  const key = process.env.JWT_SECRET;
  const token = jwt.sign({ userId }, key, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};

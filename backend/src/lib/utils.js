import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // MS
  httpOnly: true, // recommended for security
  sameSite: "lax", // or "none" if cross-origin
  secure: process.env.NODE_ENV === "production", // true in production
});


  return token;
};

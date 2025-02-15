import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

 res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // Prevent client-side access to the cookie
    secure: true, // Only send over HTTPS in production
    sameSite: 'None', // Allow the cookie to be sent in cross-origin requests
  });


  return token;
};

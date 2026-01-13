const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email } = req.body;

  const role = email.includes("admin") ? "admin" : "user";

  const token = jwt.sign(
    { email, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token, role });
};

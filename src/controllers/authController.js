const User = require("../db/models/users.model");
const sendEmail = require("../utils/mailer");
const catchAsyncErrors = require("../utils/errors/asyncWrapper");
const loginService = require("../services/authService");
const AuthService = require("../services/authService");
const userService = require("../services/userService");

/////////////////////////////////////////////////////////////////////////////////////

exports.login = catchAsyncErrors(async (req, res, next) => {
  const token = await AuthService.loginService(req.body);
  const cookieOptions = {
    sameSite: "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
  res.cookie("token", token, cookieOptions);
  res.status(200).json({ message: "Logged in successfully!" });
});

/////////////////////////////////////////////////////////////////////////////////////

exports.register = catchAsyncErrors(async (req, res) => {
  const { email, username } = req.body;
  const errors = {};

  const existingEmail = userService.getUserByEmail(email);
  const existingUsername = await User.findOne({ where: { username } });

  if (existingEmail) errors.email = "Email already exists";
  if (existingUsername) errors.username = "Username already exists";

  if (Object.keys(errors).length > 0) {
    return res.status(409).json(errors);
  }
  const user = await authService.register(req.body);

  res.status(201).json({ message: "User Registered", user });
});

//////////////////////////////////////////////////////////////////////////////////////

exports.forgotPassword = async (req, res) => {
  const { email, resetLink } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ error: " User not found!" });
  }

  const token = await authService.generatePasswordResetToken(user.id);

  const htmlContent = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            background-color: #f4f4f7;
            color: #333;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .email-container {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 100%;
            width: 600px;
            background-color: #ffffff;
            margin: 20px;
            padding: 40px;
            border-radius: 8px;
            box-sizing: border-box;
        }

        h2 {
            color: #0056b3;
            font-size: 24px;
            margin-bottom: 20px;
        }

        p {
            line-height: 1.5;
            margin: 10px 0;
        }

        a.reset-button {
            display: inline-block;
            background-color: #0056b3;
            color: #ffffff;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 20px;
        }

        .footer {
            margin-top: 40px;
            font-size: 14px;
            text-align: center;
            color: #999;
        }

        .footer a {
            color: #0056b3;
            text-decoration: none;
            font-weight: bold;
        }

        @media (max-width: 640px) {
            .email-container {
                width: 90%;
                padding: 20px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="email-header">
            <h2>Password Reset Request</h2>
        </div>
        <div class="email-content">
            <p>You are receiving this email because a password reset request was made for your account. If this was you,
                please click on the button below to reset your password:</p>
            <a href="${resetLink}/${token}" class="reset-button">Reset Password</a>
            <p>If you did not request a password reset, please disregard this email. Your password will remain unchanged
                and your account secure.</p>
        </div>
        <div class="footer">
            <p>Having trouble with the button? Copy and paste the URL below into your web browser:</p>
            <p><a href="${resetLink}/${token}"> ${token}</a></p>
        </div>
    </div>
</body>

</html>
  `;

  sendEmail(email, "Password Reset", htmlContent);

  res.status(200).json({ message: "Password reset email sent " });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  console.log(token, newPassword);

  const decoded = await authService.verifyPasswordResetToken(token);
  if (!decoded) {
    return res.status(400).json({ error: "  Invalid or expired token!" });
  }

  const user = await User.findOne({ where: { id: decoded.id } });
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }

  console.log("going well", newPassword, token);

  // const hashedPassword = await authService.hashedPassword(newPassword);
  // await user.update({ password: hashedPassword });

  res.status(200).json({ message: " Password has been reset." });
};

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

// Middleware
// Replace app.use(cors()); with this:
app.use(
  cors({
    origin: [
      "https://mithikalanagasudha-bot.github.io",
      "http://localhost:5000",
      "http://127.0.0.1:5000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.use(express.json());

// In-memory store for OTPs (Use Redis or a database in production)
const otpStore = new Map();

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Test route
app.get("/", (req, res) => {
  res.send("FixConnect Backend is Running!");
});

// ------------------------------------
// LOGIN ROUTE
// ------------------------------------
app.post("/api/login", (req, res) => {
  const { email, password, role } = req.body;

  console.log("Login Request:");
  console.log("Email:", email);
  console.log("Password:", password);
  console.log("Role:", role);

  // Temporary login checking
  if (
    email === "customer@gmail.com" &&
    password === "12345" &&
    role === "customer"
  ) {
    res.json({
      success: true,
      message: "Customer Login Successful",
      role: "customer",
    });
  } else if (
    email === "provider@gmail.com" &&
    password === "12345" &&
    role === "provider"
  ) {
    res.json({
      success: true,
      message: "Provider Login Successful",
      role: "provider",
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Invalid Email, Password or Role",
    });
  }
});

// ------------------------------------
// FORGOT PASSWORD / OTP ROUTES
// ------------------------------------

// 1. Send OTP to User Email
app.post("/api/auth/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email address is required." });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Save OTP with a 5-minute expiry timestamp
  otpStore.set(email, {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  });

  const mailOptions = {
    from: `"FixConnect AI" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Password Reset Verification Code - FixConnect AI",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Your verification code for FixConnect AI is:</p>
        <h1 style="color: #1c6fe5; letter-spacing: 4px;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Verification code sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ message: "Failed to send email. Check SMTP settings." });
  }
});

// 2. Verify Entered OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record) {
    return res.status(400).json({ message: "No OTP requested for this email." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "Verification code has expired." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Invalid verification code." });
  }

  return res.status(200).json({ message: "Code verified successfully." });
});

// 3. Reset Password
app.post("/api/auth/reset-password", (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore.get(email);

  if (!record || record.otp !== otp) {
    return res.status(400).json({ message: "Unauthorized password reset request." });
  }

  // TODO: Update user password in database once connected
  console.log(`Password reset for ${email} to: ${newPassword}`);

  // Clear OTP after successful reset
  otpStore.delete(email);

  return res.status(200).json({ message: "Password updated successfully!" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FixConnect Backend running on port ${PORT}`);
});

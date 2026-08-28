const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("FixConnect Backend is Running!");
});

// Login API
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
            role: "customer"
        });

    } 
    
    else if (
        email === "provider@gmail.com" &&
        password === "12345" &&
        role === "provider"
    ) {

        res.json({
            success: true,
            message: "Provider Login Successful",
            role: "provider"
        });

    } 
    
    else {

        res.status(401).json({
            success: false,
            message: "Invalid Email, Password or Role"
        });

    }
});


// Start Server
app.listen(5000, () => {
    console.log("FixConnect Backend running on port 5000");
});

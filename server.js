const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 8080;
const MySQLStore = require('express-mysql-session')(session);

const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root1',
    database: 'user'
});
// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { 
        secure: false,         // Set to true if you're using HTTPS
        httpOnly: true,        // Prevent client-side JavaScript from accessing the cookie
        maxAge: 24 * 60 * 60 * 1000 // 1 day expiry for the session cookie
    }
}));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root1",
    database: "user"
});

db.connect((err) => {
    if (err) {
        console.error("❌ MySQL connection error:", err);
        return;
    }
    console.log("✅ MySQL Connected!");
    
    // Ensure the users table exists with correct structure
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            phone VARCHAR(20)
        )
    `;
    
    db.query(createTableQuery, (err) => {
        if (err) {
            console.error("Error creating users table:", err);
        } else {
            console.log("✅ Users table verified/created");
        }
    });
});


app.post("/enroll", isAuthenticated, (req, res) => {
    const userId = req.session.user.id; // Get the logged-in user's ID
    const { id } = req.body; // Get the program ID from the request body

    if (!id) {
        return res.status(400).send("Program ID is required");
    }

    const query = "INSERT INTO enrollments (user_id, program_id) VALUES (?, ?)";
    db.query(query, [userId, id], (err, result) => {
        if (err) {
            console.error("Error enrolling user:", err);
            return res.status(500).send("Error enrolling in program");
        }

        console.log("Enrollment successful:", result);
        res.redirect(`/payment?id=${id}`); // Redirect to the payment page
    });
});

// Middleware to make session data available in all EJS templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Make `user` available globally in templates
    next();
});

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect(`/login?redirectTo=${req.originalUrl}`);
}
// app.get("/enroll", isAuthenticated, (req, res) => {
//     res.render("enroll", { user: req.session.user });
// });

// Login route
app.get("/login", (req, res) => {
    const redirectTo = req.query.redirectTo || "/";
    res.render("login", { redirectTo });
});


app.get("/", (req, res) => res.render("homepage", { user: req.session.user, page: 'home' }));
app.get("/program", (req, res) => {
    const query = "SELECT * FROM programs"; // Fetch programs from the correct table

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching programs:", err);
            return res.status(500).send("Error loading programs");
        }

        // Log the results for debugging
        console.log("Programs fetched from the database:", results);

        // Pass the programs to the EJS template
        res.render("program", { user: req.session.user, page: 'program', programs: results });
    });
});
app.get("/diet", (req, res) => {
    try {
        console.log("Session data:", req.session); // Debug session data
        res.render("diet", { user: req.session.user, page: 'diet'});
    } catch (error) {
        console.error("Error rendering diet page:", error);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/store", (req, res) => res.render("store", { user: req.session.user, page: 'store' }));
app.get("/payment", (req, res) => res.render("payment", { user: req.session.user, page: 'payment' }));
app.get("/cart", (req, res) => res.render("cart", { user: req.session.user, page: 'cart' }));
app.get("/signup", (req, res) => res.render("signup"));
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send("Error logging out");
        res.redirect("/");
    });
});
app.get("/lean_light", (req, res) => {
    res.render("lean_light", { user: req.session.user, page: 'lean_light' });
});
app.get("/balanced_bites", (req, res) => res.render("balanced_bites", { user: req.session.user,page: 'balanced_bites' }));
app.get("/keto_kickstart", (req, res) => res.render("keto_kickstart", { user: req.session.user, page: 'keto_kickstart' }));
app.get("/mediterranean_method", (req, res) => res.render("mediterranean_method", { user: req.session.user ,page: 'mediterranean_method'}));
app.get("/power_plate", (req, res) => res.render("power_plate", { user: req.session.user,page: 'power_plate' }));
app.get("/program-detail", (req, res) => {
    const id = parseInt(req.query.id, 10); // Gets ?id=1 from the URL

    // Fetch program details from DB
    const query = "SELECT * FROM programs WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error fetching program:", err);
            return res.status(500).send("Error loading program details");
        }

        if (results.length === 0) {
            return res.status(404).send("Program not found");
        }

        const program = results[0];
        
        // Parse curriculum as JSON if it exists, or provide empty array as fallback
        let curriculum = [];
        if (program.curriculum) {
            try {
                curriculum = JSON.parse(program.curriculum);
            } catch (e) {
                console.error("Error parsing curriculum JSON:", e);
                // Keep curriculum as empty array if parsing fails
            }
        }

        // Render program-detail page with fetched data
        res.render("program-detail", {
            user: req.session.user,
            page: 'program-detail',
            program: {
                id: program.id,
                name: program.name,
                description: program.description,
                duration: program.duration,
                sessions_per_week: program.sessions_per_week,
                price: program.price,
                level: program.level,
                image_url: program.image_url,
                enrolled_count: program.enrolled_count,
                curriculum: curriculum, // Use the parsed array here
            },
        });
    });
});



app.get("/fitness_ass", (req, res) => res.render("fitness_ass", { user: req.session.user,page: 'fitness_ass' }));
app.get("/privacy", (req, res) => res.render("privacy", { user: req.session.user }));
app.get("/terms", (req, res) => res.render("terms", { user: req.session.user }));
app.get("/about", (req, res) => res.render("about", { user: req.session.user }));
app.get("/contact", (req, res) => res.render("contact", { user: req.session.user }));
app.get("/faq", (req, res) => res.render("faq", { user: req.session.user }));
app.get("/team", (req, res) => res.render("team", { user: req.session.user }));
app.get("/help", (req, res) => res.render("help", { user: req.session.user }));


app.post("/login", (req, res) => {
    const { email, password, redirectTo } = req.body;
    const redirect = redirectTo || "/";

    console.log("Login attempt for email:", email);

    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error("Login DB error:", err);
            return res.status(500).send("Internal Server Error");
        }

        if (results.length === 0) {
            console.log("User not found for email:", email);
            return res.send("❌ Invalid email or password");
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log("Invalid password for:", email);
            return res.send("❌ Invalid email or password");
        }

        req.session.user = user; // Store user in session
        console.log("Login successful for:", email);
        res.redirect(redirect); // Redirect to the original requested page
    });
});

app.post("/signup", async (req, res) => {
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send("Name, email, and password are required");
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the user already exists
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
            if (err) {
                console.error("Error checking existing user:", err);
                return res.status(500).send("Internal Server Error");
            }

            if (results.length > 0) {
                return res.status(400).send("User with this email already exists");
            }

            // Insert the new user
            const query = "INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)";
            db.query(query, [name, email, hashedPassword, phone || null], (err, result) => {
                if (err) {
                    console.error("Error inserting new user:", err);
                    return res.status(500).send("Error creating account");
                }

                req.session.user = {
                    id: result.insertId,
                    name,
                    email,
                    phone: phone || null
                };

                res.redirect("/");
            });
        });
    } catch (err) {
        console.error("Error hashing password:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error during logout:", err);
            return res.status(500).send("Error logging out");
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        console.log("User logged out successfully");
        res.redirect("/");
    });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something broke! Please check server logs.');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Utility function to update plain passwords to bcrypt (run this manually or on demand)
app.get('/admin/update-passwords', async (req, res) => {
    // This should be protected with admin authentication in production
    
    // Get all users with plain text passwords (those not starting with $2)
    db.query("SELECT id, password FROM users WHERE password NOT LIKE '$2%'", async (err, users) => {
        if (err) {
            return res.status(500).send("Error fetching users");
        }
        
        for (const user of users) {
            // Hash the plain password
            const hashedPassword = await bcrypt.hash(user.password, 10);
            
            // Update the user record
            db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id], (err) => {
                if (err) console.error(`Error updating user ${user.id}:`, err);
            });
        }
        
        res.send(`Updated ${users.length} passwords`);
    });
});
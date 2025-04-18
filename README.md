# DBMS-Project-FlexFusion-Fitness website
# 💪 Flex Fusion – Fitness Website Database System

A DBMS project developed as part of the Semester IV coursework at SVKM’s NMIMS, Indore.  
This system supports personalized fitness plans, product purchases, wellness content, and data-driven tracking for a health-focused platform.

👨‍💻 Team Members

| Roll No. | Name             |
|----------|------------------|
| D077     | Samriddhi Motiani |
| D041     | Khyati Anand      |
| D082     | Shubh Sethi       |

🧩 Project Components

 📌 1. Storyline
A complete fitness management system with:
- User registration and login
- Product catalog and purchase system
- Personalized diet plans and recipes
- Fitness program enrollments
- Mindfulness content (e.g., guided meditation)

📌 2. Database Design
Includes the following entities:
- **User**
- **Products**
- **Categories**
- **Orders**
- **OrderDetails**
- **Programs**
- **DietPlans**
- **DietRecipes**
- **MindfulnessContent**

### 📌 3. Relationships
- A user can place many orders.
- Products belong to categories.
- Orders contain multiple products.
- Diet plans have multiple recipes.
- Users enroll in programs and access mindfulness content.

 📌 4. ER Diagram & Relational Model
Designed to clearly map all 1:N and M:N relationships with appropriate foreign keys.

 📌 5. Normalization
All tables normalized up to **3NF/BCNF**, eliminating redundancy:
- Split of non-atomic fields in diet recipes into separate `Ingredients` and `Instructions` tables.
- Composite keys and derived values (e.g., `TotalAmount` excluded from normalized `Orders`).

 🛠️ SQL Features Demonstrated

 🔧 DDL (Data Definition Language)
- `CREATE`, `ALTER`, `DROP` for tables and columns.

 ✍️ DML (Data Manipulation Language)
- `INSERT`, `UPDATE`, `SELECT`, `ORDER BY`, etc.

 🔍 Joins
- `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`

 📊 Aggregates & Grouping
- `COUNT`, `AVG`, `MAX`, `GROUP BY` queries for insights

🧪 Set Operations
- `UNION`, `INTERSECT` (emulated), `EXCEPT` (using `NOT IN`)

 🔐 DCL (Data Control Language)
- `GRANT`, `REVOKE` for user permissions

 🔁 Transaction Control
- `START TRANSACTION`, `COMMIT`, `ROLLBACK`

 🚀 Learning Outcomes

- Applied ER modeling and normalization principles
- Developed robust SQL queries and schema design
- Hands-on experience with MySQL Workbench
- Collaborated in a team-based software development process
- Simulated real-world use cases like ecommerce + wellness tech

 🧠 Beyond the Classroom

- Learned role-based access with DCL
- Implemented transactions with ACID properties
- Used SQL Views and explored BCNF
- Studied real platforms like MyFitnessPal & Cure.fit for schema inspiration
- Practiced query optimization & version control with SQL files

 📉 Challenges Faced

- Avoiding redundancy in TotalAmount derivation
- Storing atomic ingredients and instructions
- Managing schema evolution with team version control
- Adapting to MySQL Workbench for complex joins and relationships

 ✅ Conclusion

Flex Fusion provided valuable exposure to database design, SQL programming, and backend logic for real-world systems. It combines academic principles with industry-relevant implementation.

---

 📂 How to Use This Project

1. Open MySQL Workbench.
2. Create a database: `CREATE DATABASE FlexFusion; USE FlexFusion;`
3. Run the full SQL script (`FlexFusion.sql`) with all DDL & DML commands.
4. Explore queries under aggregation, joins, set operations, and transactions.

---


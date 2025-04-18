create database flexfusion;
use flexfusion;

CREATE TABLE User (
    UserID INT PRIMARY KEY,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Email VARCHAR(50),
    Password VARCHAR(100)
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(100)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Description VARCHAR(255),
    Price DECIMAL(8,2),
    Stock INT,
    Category_ID INT,
    FOREIGN KEY (Category_ID) REFERENCES Categories(CategoryID)
);

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    OrderDate DATE,
    TotalAmount DECIMAL(8,2),
    PaymentStatus VARCHAR(100)
);

CREATE TABLE OrderDetails (
    OrderID INT,
    ProductID INT,
    Quantity INT,
    UnitPrice DECIMAL(8,2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

CREATE TABLE Programs (
    ProgramID INT PRIMARY KEY,
    Title VARCHAR(100),
    Description VARCHAR(255),
    Duration INT,
    EnrollmentDate DATE
);

CREATE TABLE DietPlans (
    DietPlanID INT PRIMARY KEY,
    UserID INT,
    Title VARCHAR(100),
    Description VARCHAR(255),
    Duration INT,
    DailyCalories INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);

CREATE TABLE DietRecipes (
    DietPlanID INT,
    RecipeName VARCHAR(100),
    Instructions VARCHAR(255),
    Ingredients VARCHAR(255),
    FOREIGN KEY (DietPlanID) REFERENCES DietPlans(DietPlanID)
);

CREATE TABLE MindfullnessContent (
    ContentID INT PRIMARY KEY,
    ContentType VARCHAR(50),
    Description TEXT,
    DatePublished DATE
);

CREATE TABLE Ingredient_table (
    RecipeID INT,
    IngredientName VARCHAR(100)
);

CREATE TABLE Instruction (
    RecipeID INT,
    Instruction VARCHAR(255)
);

ALTER TABLE User ADD Phone VARCHAR(20);
ALTER TABLE User MODIFY Email VARCHAR(150);
ALTER TABLE Products CHANGE Stock AvailableStock INT;
ALTER TABLE Products ADD Discount DECIMAL(5,2);
ALTER TABLE Orders DROP COLUMN PaymentStatus;

INSERT INTO User (UserID, First_name, Last_name, Email, Password) VALUES
(1, 'Alice', 'Smith', 'alice@example.com', 'pass123'),
(2, 'Bob', 'Johnson', 'bob@example.com', 'secure456'),
(3, 'Charlie', 'Brown', 'charlie@example.com', 'charlie789'),
(4, 'David', 'Wilson', 'david@example.com', 'david321'),
(5, 'Eva', 'Taylor', 'eva@example.com', 'eva987'),
(6, 'Frank', 'Anderson', 'frank@example.com', 'frank555'),
(7, 'Grace', 'Thomas', 'grace@example.com', 'grace123'),
(8, 'Helen', 'White', 'helen@example.com', 'helen654'),
(9, 'Ian', 'Scott', 'ian@example.com', 'ian111'),
(10, 'Julia', 'Moore', 'julia@example.com', 'julia222');

INSERT INTO Categories (CategoryID, CategoryName) VALUES
(1, 'Supplements'),
(2, 'Equipment'),
(3, 'Books'),
(4, 'Protein'),
(5, 'Clothing'),
(6, 'Accessories'),
(7, 'Meal Kits'),
(8, 'Beverages'),
(9, 'Vitamins'),
(10, 'Wellness');

INSERT INTO Products (ProductID, ProductName, Description, Price, AvailableStock, CategoryID) VALUES
(1, 'Whey Protein', 'High quality whey protein', 500.00, 20, 4),
(2, 'Yoga Mat', 'Non-slip yoga mat', 1200.00, 300, 2),
(3, 'Vitamin D', 'Essential vitamin for immunity', 600.00, 100, 9),
(4, 'Resistance Bands', 'Set of resistance bands', 1500.00, 40, 2),
(5, 'Workout Shirt', 'Breathable shirt', 800.00, 300, 5),
(6, 'Shaker Bottle', 'Protein shaker', 350.00, 450, 6),
(7, 'Omega 3', 'Fish oil supplements', 900.00, 700, 9),
(8, 'Healthy Snacks', 'Protein-packed snacks', 300.00, 45, 7),
(9, 'Fitness Book', 'Beginner workout guide', 200.00, 25, 3),
(10, 'Hydration Drink', 'Electrolyte beverage', 150.00, 200, 8);

INSERT INTO Orders (OrderID, UserID, OrderDate, TotalAmount, PaymentStatus) VALUES
(101, 1, '2024-03-01', 2499.00, 'UPI'),
(102, 2, '2024-03-03', 1599.00, 'Netbanking'),
(103, 3, '2024-03-05', 799.00, 'COD'),
(104, 4, '2024-03-06', 1799.00, 'UPI'),
(105, 5, '2024-03-08', 999.00, 'Netbanking'),
(106, 6, '2024-03-10', 499.00, 'UPI'),
(107, 7, '2024-03-12', 1199.00, 'COD'),
(108, 8, '2024-03-14', 649.00, 'Netbanking'),
(109, 9, '2024-03-15', 899.00, 'UPI'),
(110, 10, '2024-03-17', 349.00, 'UPI');

INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
(101, 1, 1, 500.00),
(102, 2, 2, 1200.00),
(103, 3, 1, 600.00),
(104, 4, 2, 1500.00),
(105, 5, 1, 800.00),
(106, 6, 2, 350.00),
(107, 7, 1, 900.00),
(108, 8, 2, 300.00),
(109, 9, 1, 200.00),
(110, 10, 2, 150.00);

INSERT INTO Programs (ProgramID, Title, Description, EnrollmentDate, Duration) VALUES
(1, 'Yoga Basics', 'Intro to yoga', '2024-01-01', 4),
(2, 'HIIT', 'High Intensity training', '2024-01-15', 6),
(3, 'Strength Training', 'Weight training basics', '2024-02-01', 8),
(4, 'Meditation', 'Mind relaxation techniques', '2024-02-10', 3),
(5, 'Cardio Boost', 'Cardio workouts', '2024-02-20', 5),
(6, 'Pilates Cone', 'Pilates for core strength', '2024-03-01', 4),
(7, 'Zumba', 'Dance-based fitness', '2024-03-10', 6),
(8, 'Stretching', 'Daily stretching routines', '2024-03-15', 2),
(9, 'CrossFit Intro', 'Basics of CrossFit', '2024-03-20', 4),
(10, 'Mind-Body Wellness', 'Combo of yoga & meditation', '2024-03-25', 7);

INSERT INTO DietPlans (DietPlanID, UserID, Title, Description, Duration, DailyCalories) VALUES
(201, 1, 'Keto Diet', 'Low carb, high fat', 30, 1800),
(202, 2, 'Vegan Plan', 'Plant-based meals', 30, 1600),
(203, 3, 'Intermittent Fasting', '16:8 routine', 14, 1500),
(204, 4, 'High Protein Diet', 'Protein focused diet', 21, 2000),
(205, 5, 'Low Carb', 'Minimizing carbs', 25, 1700),
(206, 6, 'Balanced Diet', 'All macros included', 30, 2200),
(207, 7, 'Paleo Diet', 'Natural, unprocessed food', 20, 1900),
(208, 8, 'Mediterranean', 'Healthy fats & grains', 30, 2000),
(209, 9, 'Detox Plan', 'Clean eating detox', 10, 1400),
(210, 10, 'Weight Gain Plan', 'High calorie intake', 30, 2500);

INSERT INTO DietRecipes (DietPlanID, RecipeName, Instructions, Ingredients) VALUES
(201, 'Keto Pancakes', 'Mix and cook on skillet.', 'Almond flour, eggs, butter'),
(202, 'Vegan Bowl', 'Combine and serve chilled.', 'Quinoa, chickpeas, avocado'),
(203, 'Fasting Smoothie', 'Blend all items.', 'Spinach, banana, almond milk'),
(204, 'Protein Omelet', 'Cook on pan.', 'Eggs, cheese, spinach'),
(205, 'Low Carb Salad', 'Toss and serve.', 'Lettuce, chicken, dressing'),
(206, 'Grilled Chicken', 'Grill and season.', 'Chicken breast, olive oil, herbs'),
(207, 'Paleo Stir Fry', 'Saute veggies and meat.', 'Broccoli, bell pepper, beef'),
(208, 'Greek Salad', 'Mix all ingredients.', 'Cucumber, olives, feta'),
(209, 'Green Juice', 'Juice all greens.', 'Kale, cucumber, apple'),
(210, 'Peanut Butter Shake', 'Blend until smooth.', 'Milk, banana, peanut butter');

INSERT INTO MindfulnessContent (ContentID, ContentType, Description, DatePublished) VALUES
(301, 'Meditation', 'Breathing techniques', '2024-01-01'),
(302, 'Mindfulness', 'Awareness practice', '2024-01-05'),
(303, 'Visualization', 'Guided imagery', '2024-01-10'),
(304, 'Yoga Nidra', 'Deep relaxation', '2024-01-15'),
(305, 'Body Scan', 'Focus on body parts', '2024-01-20'),
(306, 'Affirmations', 'Positive affirmations', '2024-01-25'),
(307, 'Sound Healing', 'Using sound for focus', '2024-02-01'),
(308, 'Walking Meditation', 'Mindful walking', '2024-02-05'),
(309, 'Self-Compassion', 'Self-kindness techniques', '2024-02-10'),
(310, 'Journaling', 'Reflection practices', '2024-02-15');

UPDATE Products SET Price = 1399.00 WHERE ProductID = 101;

-- SELECT

SELECT * FROM User;

-- ORDER BY

SELECT * FROM Products ORDER BY Price DESC;

-- JOINS

-- INNER JOIN
SELECT U.Name, O.OrderID FROM User U
INNER JOIN Orders O ON U.UserID = O.UserID;

-- LEFT OUTER JOIN
SELECT U.Name, O.OrderID FROM User U
LEFT JOIN Orders O ON U.UserID = O.UserID;

-- RIGHT OUTER JOIN
SELECT U.Name, O.OrderID FROM User U
RIGHT JOIN Orders O ON U.UserID = O.UserID;

-- AGGREGATE FUNCTIONS

SELECT COUNT(*) AS TotalUsers FROM User;

SELECT SUM(TotalAmount) AS Revenue FROM Orders;

SELECT AVG(TotalAmount) AS AvgSpent FROM Orders;

SELECT ProductName FROM Products WHERE Price = (SELECT MAX(Price) FROM Products);

SELECT ProductName FROM Products WHERE Price = (SELECT MIN(Price) FROM Products);

-- GROUP BY

SELECT SUBSTRING_INDEX(Email, '@', -1) AS Domain, COUNT(*) AS TotalUsers
FROM User GROUP BY Domain;

SELECT Category_ID, COUNT(*) AS ProductCount
FROM Products GROUP BY Category_ID;

SELECT Duration, COUNT(*) AS PlanCount FROM DietPlans GROUP BY Duration;

-- ADVANCED GROUP BY

SELECT * FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

SELECT Title FROM Programs
WHERE Duration > (SELECT AVG(Duration) FROM Programs);

-- SET OPERATIONS

-- UNION
SELECT Title FROM Programs
UNION
SELECT Title FROM DietPlans;

-- INTERSECT (Not directly supported in MySQL, emulate using INNER JOIN)
SELECT p.Title FROM Programs p
INNER JOIN DietPlans d ON p.Title = d.Title;

-- EXCEPT / MINUS (emulate using NOT IN)
SELECT Title FROM Programs
WHERE Title NOT IN (SELECT Title FROM DietPlans);

-- DCL (Examples - assuming users exist)
GRANT SELECT, INSERT ON FlexFusion.* TO 'trainer'@'localhost';
REVOKE INSERT ON FlexFusion.* FROM 'trainer'@'localhost';

-- TRANSACTION CONTROL
START TRANSACTION;
UPDATE Products SET AvailableStock = AvailableStock - 1 WHERE ProductID = 101;
INSERT INTO Orders VALUES (5002, '2025-04-18', 1299.00, 'COD');
COMMIT;


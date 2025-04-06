// # 1
/* git add .
git commit -m "fonts style updated"
git push
*/
//Import the MySQL2 library to interact with the MySQL dattabase
let mysql2 = require("mysql2");

// Import the Express framework to create a web server.
let express = require("express");

// import the body parser
let bodyparser = require("body-parser");
const bodyParser = require("body-parser");

// Initialize an Express application
let app = express();
//make it listen at port 5000.
app.listen(5000, () => {
  console.log("The server is up and running.");
});

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Creating the connection object with the provided configuration
let connection = mysql2.createConnection({
  //Key and value pairs of configuration
  user: "myDBuser",
  host: "localhost",
  password: "0148",
  database: "mydb",
});

//  establishing the connection to the database
connection.connect((err) => {
  if (err) console.log("Couldn't connect to the database: " + err.message);
  else console.log("Connected to the database!");
});

// #2
//* Syntax
/* CREATE TABLE table_name (
    Column_name datatype,
    Column_name datatype,
    Column_name datatype,
   ....
); */

//#2
// using get request to handle the /install route.
app.get("/install", (req, res) => {
  // Products table query
  let createProducts = `CREATE TABLE IF NOT EXISTS Products(
Product_id INT PRIMARY KEY AUTO_INCREMENT,
Product_url VARCHAR(255),
Product_name VARCHAR(100)
)`;
  // Product_Description table query
  let createDescription = `CREATE TABLE IF NOT EXISTS Product_Description(
Description_id INT PRIMARY KEY AUTO_INCREMENT,
Product_id INT,
Product_brief_description VARCHAR(300),
Product_description TEXT,
Product_img VARCHAR(255),
Product_link VARCHAR(255),
FOREIGN KEY (Product_id) REFERENCES Products(Product_id) 
)`;
  // Product_Price table query
  let createPrice = `CREATE TABLE IF NOT EXISTS Product_Price(
Price_id INT PRIMARY KEY AUTO_INCREMENT,
Product_id INT,
Starting_price VARCHAR(100),
Price_range VARCHAR(100),
FOREIGN KEY (Product_id) REFERENCES Products(Product_id)
)`;
  // User table query
  let createUser = `CREATE TABLE IF NOT EXISTS User(
User_id INT PRIMARY KEY AUTO_INCREMENT,
User_name VARCHAR(50) NOT NULL,
User_password VARCHAR(50) NOT NULL
)`;

  // Orders table query
  let createOrders = `CREATE TABLE IF NOT EXISTS Orders (
Order_id INT PRIMARY KEY AUTO_INCREMENT ,
Product_id INT,
User_id INT ,
FOREIGN KEY (Product_id) REFERENCES Products (Product_id),
FOREIGN KEY (user_id) REFERENCES User(User_id)
)`;
  // Excuting Products table query
  connection.query(createProducts, (err, result) => {
    if (err) {
      console.log(err);
      return res.send("Error while creating Products table.");
    }
    console.log("Products table created");
    // Excuting Product_Description table query
    connection.query(createDescription, (err, result) => {
      if (err) {
        console.log(err);
        return res.send("Error while creating Product_Description table.");
      }
      console.log("Product_Description table created.");
      // Excutong Product_Price table query
      connection.query(createPrice, (err, result) => {
        if (err) {
          console.log(err);
          return res.send("Error while creating Product_Price table");
        }
        console.log("Product_Price table created.");
        // Excuting user table query
        connection.query(createUser, (err, result) => {
          if (err) {
            console.log(err);
            return res.send("Error while creating user table.");
          }
          console.log("User table created.");
          // Excuting Orders table query
          connection.query(createOrders, (err, result) => {
            if (err) {
              console.log(err);
              return res.send("Error while creating Orders table.");
            }
            console.log("Orders table created.");
            res.send("All tables created successfully!");
          });
        });
      });
    });
  });
});
app.post("/add-product", (req, res) => {
  // res.send("Am working");
  console.log(req.body);
  let product_url = req.body.product_url;
  let product_name = req.body.product_name;

  // syntax
  /* INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...); */

  let addToProducts = `INSERT INTO Products(
  Product_url, Product_name) VALUES ( product_url,product_name )`;
  connection.query(addToProducts, (err, result) => {
    if (err) console.log(err.message)
    else {
    res.send("Values are added")
    }
  });
});

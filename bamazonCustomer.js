var mysql = require("mysql");
var Table = require('easy-table')
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3307,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazonDB"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    var data = [];
    for (var i = 0; i < res.length; i++) {
      data.push(res[i]);
    }
    //create table for terminal 
    var t = new Table

    data.forEach(function (products) {
      t.cell('Product Id', products.item_id)
      t.cell('Product Name', products.product_name)
      t.cell('Department Name', products.department_name)
      t.cell('Price, USD', products.price, Table.number(2))
      t.cell('Total Available', products.stock_quantity)
      t.newRow()
    });
    console.log(t.toString())
    purchaseItem();

    //item being requested to purchase
    function purchaseItem() {
      inquirer
        .prompt([{

          name: "choice",
          type: "input",
          message: "What item ID would you like to purchase?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }

        ])


        //take product ID they entered and check to make sure there are enough in stock to sell them

        //if your store _does_ have enough of the product, you should fulfill the customer's order.
        //This means updating the SQL database to reflect the remaining quantity.
        //Once the update goes through, show the customer the total cost of their purchase.


        .then(function (answer) {
          // console.log(answer);
          // find out how many items we have of particular item_id
          connection.query("SELECT stock_quantity, product_name, price FROM products where item_id=?", [answer.choice], function (err, res) {
            console.log("You have asked for: " + answer.quantity +" " + res[0].product_name);
            console.log("Cost per unit: " + "$" + res[0].price);
            // console.log(res[0].stock_quantity);
            if (answer.quantity <= res[0].stock_quantity) {
              //update db, let user know and start over
              console.log("We have enough! your total cost is: " + (answer.quantity*res[0].price));
              var newStock = res[0].stock_quantity - answer.quantity;
              var userChoice = answer.choice;
              // console.log(newStock);
              //this is where we will call new function and pass in new stock
              updateProducts(newStock, userChoice);
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("Insufficient quantity!");
              stop();
            }
          });


          function updateProducts(newStock, userChoice) {
            // console.log("this is the total new stock: " + newStock)
            // console.log("This was the user ID selected: " + userChoice)
            connection.query(
              "UPDATE products SET stock_quantity=? WHERE item_id=?",
              [newStock, userChoice],

              function (error) {
                if (error) throw err;
                console.log("Products have been purchased!");
                stop();
              }
            );
          }

          function stop() {
            connection.end()
          }





        })
    }
  })
}

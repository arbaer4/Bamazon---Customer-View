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

        //If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

        //if your store _does_ have enough of the product, you should fulfill the customer's order.
        //This means updating the SQL database to reflect the remaining quantity.
        //Once the update goes through, show the customer the total cost of their purchase.


        .then(function (answer) {
          console.log(answer);
          // find out how many items we have of particular item_id
          connection.query("SELECT stock_quantity FROM products where item_id=?", [answer.choice], function(err, res) {
            console.log(res[0].stock_quantity);
            console.log(answer.quantity);
              if (answer.quantity <= res[0].stock_quantity) {
                //update db, let user know and start over
                console.log("we have enough");

               
              }
              //else alert user of insufficient supply 

              else {
                // bid wasn't high enough, so apologize and start over
                console.log("Insufficient quantity!");
                connection.end();
              }
          });

          // // determine if enough in stock
          // if (false) {
          //   // stock was high enough, so update db, let the user know, and start over
          //   connection.query(
          //     "UPDATE products SET ? WHERE ?",
          //     [
          //       {
          //         stock_quantity: answer.quantity
          //       },
          //       {
          //         item_id: answer.choice
          //       }
          //     ],
          //     function (error) {
          //       if (error) throw err;
          //       console.log("Bid placed successfully!");
          //     }
          //   );
          // }
          // else {
          //   // bid wasn't high enough, so apologize and start over
          //   console.log("Insufficient quantity!");
          //   connection.end();
          // }
        });
    }
  })
}

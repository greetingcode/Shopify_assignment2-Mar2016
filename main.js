/*
  Created by Minseok Kim on 29/02/2016
  Revised on 01/03/2016
  
  Revision includes the recent updated features of Javascript.
  
  As I have to compare different expressions, I would like to explain my code in comments.
  
*/

'use strict';

let order_productA = {
  payment_type: 'creditcard',
  payment: {
    getCardType: 'Master Card',
    card_number: 1234567890123
  },
  products: {
    name: 'Mechanical Keyboard A'
  },
  amount_in_dollars: 127.99
};              // an object to test the following receipt functions

function receiptA(order) {
  let payment_type = order.payment_type;
  let p = 'Payment info: ';             //in order to prevent unnecessary repetition and improve readability
  
  if (payment_type = 'creditcard') {  
    p += order.payment.getCardType + ' ' + order.payment.card_number;
  } else if (payment_type == 'paypal') {
    p += order.payment.paypal_info;
  } else if (payment_type == 'manual') {
    p += order.payment.manual_payment_info;
  } else if (payment_type == 'free') {
    p = 'Payment info: This order was free!';               //Free order or promotional item
  } else {
    p = 'Payment info: ' + order.payment.default_payment_info;              //default order info
  }             // the last 'else if' incorrectly had 'if' in it, so I took it away.

  if (order.payment_type != 'free') {
    p = p + '<p> was charged ' + order.amount_in_dollars + '$' + '</p>';
  }             // to print the amount of money charged if the order was not free. 

  let html = '<p>' + 'Your order of ' + order.products.name + ' has been received' + '</p>' + '<p>' + p + '</p>';                   document.write('<h1> Order receipt details A</h1>' + html);
}
/*
It is very important to put either 'let' or 'var' when declaring a variable within the execution context of a function. 
If not with the 'let' or 'var, it will become a global variable. Unnecessarily declared global variables are not good.
*/


function receiptB(order) {
  let payment_type = order.payment_type;
  let p = 'Payment info: ';
  let creditcard = p + order.payment.getCardType + ' ' + order.payment.card_number;
  let paypal = p + order.payment.paypal_info;
  let manual = p + order.payment.manual_payment_info;
  let free = p + 'This order was free!';
  let notFree = '<p> was charged ' + order.amount_in_dollars + '$' + '</p>';
  let dft = p + order.payment.default_payment_info;
                // what to print depending conditions. I wrote them in variables for better readability. 
                // to be honest, using conditional operator for this function may not be the best. 
    
  let t = (payment_type === 'creditcard') ? creditcard :
    (payment_type === 'paypal') ? paypal :
    (payment_type === 'manual') ? manual :
    (payment_type === 'free') ? free : dft;             // default when all the conditions turn to be false.
  
                // after checking the conditions, the appropriate text will be assigned to the 't' variable. 
  
  if (payment_type !== 'free') {
    t += notFree;
  }             // to prink the dollar figure when the order is not free.
    
  let receiptTxt = '<p>' + 'Your order of ' + order.products.name + ' has been received' + '</p>' + '<p>' + t + '</p>';
  document.write('<h1> Order receipt details B</h1>' + receiptTxt);
}


function receiptC(order) {
  let payment_type = order.payment_type;
  let p = 'Payment info: ';             //to avoid redundancy and improve readability

  switch (payment_type) {
    case 'creditcard':
      p += order.payment.getCardType + ' ' + order.payment.card_number;
      break;
    case 'paypal':
      p += order.payment.paypal_info;
      break;
    case 'manual':
      p += order.payment.manual_payment_info;
      break;
    case 'free':
      p += 'This order was free!';              //free order or promotional item
      break;
    default:
      p += order.payment.default_payment_info;              //default order info
      break;
  }

  if (payment_type != 'free') {
    p = p + '<p> was charged ' + order.amount_in_dollars + '$' + '</p>';
  }

  let html = '<p>' + 'Your order of ' + order.products.name + ' has been received' + '</p>' + '<p>' + p + '</p>';
  document.write('<h1> Order receipt details C</h1>' + html);
}

receiptA(order_productA);
receiptB(order_productA);
receiptC(order_productA);


/*

All the three functions will display the same results with the given object at least. 
There may be some more ways to write this receipt functino, which includes a method searching way(object that stores functions). 
However, among all of these, I believe that the switch-case statement may be the ideal choice for the most clean and readable code. 

*/

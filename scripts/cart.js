let cart = document.getElementById("cart");
let cartHeader = document.getElementById("cart-header");

let generateReceipt = document.getElementById("generateReceipt");

let userFinalReceiptData = '';

let userDetailReceiptData ='';
let cartBillData = '';
let billAmountData = '';

let selectedProduct = JSON.parse(localStorage.getItem("product")) || [];

let displayCartItems = () => {
    if (selectedProduct.length !== 0) {
        generateReceipt.classList.remove('main-box');
        label.innerHTML = `
        <h2>Cart</h2>
        `;
        return (cart.innerHTML = selectedProduct
            .map((x) => {
              let { id, item } = x;
              let searchItem = productDetail.find((i) => i.id == id) || [];
              return `
            <div class="cart-item">
                <table>
                    <tr>
                    <td><img src=${searchItem.img} alt="product">
                    <td>${searchItem.name}</td>
                    <td>
                    <div class="buttons">
                        <i onclick="decrementCount(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${item}
                        </div>
                        <i onclick="incrementCount(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    </td>
                    <td>$${searchItem.price}</td>
                    <td>$${searchItem.price * item}</td>
                    </tr>
                </table>
                <div>
            `;
            })
            .join(""));
    } else {
      cart.innerHTML = ``;
      cartHeader.innerHTML = ``;
      cart.classList.remove('cartlist');
      generateReceipt.classList.remove('main-box');
      label.innerHTML = `
      <h2>Cart is Empty</h2>
      `;
    }
  };
  
  displayCartItems();

  let incrementCount = (id) => {
    let searchItem = selectedProduct.find((item) => item.id === id);
    if (searchItem === undefined) {
        selectedProduct.push({
        id: id,
        item: 1,
      });
    } else {
        searchItem.item += 1;
    }
    displayCartItems();
    updateRecord(id);
    localStorage.setItem("product", JSON.stringify(selectedProduct));
  };

  let decrementCount = (id) => {
    let searchItem = selectedProduct.find((item) => item.id === id);
    if (searchItem === undefined) return;
    else if (searchItem.item === 0) return;
    else {
        searchItem.item -= 1;
    }
    updateRecord(id);
    selectedProduct = selectedProduct.filter((item) => item.item !== 0);
    displayCartItems();
    localStorage.setItem("product", JSON.stringify(selectedProduct));
  };

  let updateRecord = (id) => {
    let searchItem = selectedProduct.find((item) => item.id === id);
    document.getElementById(id).innerHTML = searchItem.item;
  };

    let customerName = "";
    let phone = "";
    let postcode = "";
    let address = "";
    let city = "";
    let province = "";

    let userDetailError = true; 

  function validateUserData(){

    customerName = document.getElementById("name").value;
    phone = document.getElementById("phone").value;
    postcode = document.getElementById("postcode").value;
    address = document.getElementById("address").value;
    city = document.getElementById("city").value;
    province = document.getElementById("province").value;

    postalCodeRegex = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/

    emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/

    if (customerName == "")
    {
        document.getElementById("errName").innerHTML = "Please enter your name";
        userDetailError = true;
    }
    else {
        document.getElementById("errName").innerHTML = "";
        userDetailError = false;
    }

    if (phone == "")
    {
        document.getElementById("errPhone").innerHTML = "Please enter your phone number";
        userDetailError = true;
    }
    else {
        document.getElementById("errPhone").innerHTML = "";
        userDetailError = false;
    }

    if(postcode == ""){
        document.getElementById("errPostcode").innerHTML = "Please enter your postal code";
        userDetailError = true;
    }
    else if(postalCodeRegex.test(postcode) == false){
        document.getElementById("errPostcode").innerHTML = "Please enter a postal code in the format XXX XXX";
        userDetailError = true;
    }
    else {
        document.getElementById("errPostcode").innerHTML = "";
        userDetailError = false;
    }

    if (address == "")
    {
        document.getElementById("errAddress").innerHTML = "Please enter your address";
        userDetailError = true;
    }
    else {
        document.getElementById("errAddress").innerHTML = "";
        userDetailError = false;
    }

    if (city == "")
    {
        document.getElementById("errCity").innerHTML = "Please enter your city";
        userDetailError = true;
    }
    else {
        document.getElementById("errCity").innerHTML = "";
        userDetailError = false;
    }

    if (province == "")
    {
        document.getElementById("errProvince").innerHTML = "Select your province";
        userDetailError = true;
    }
    else {
        document.getElementById("errProvince").innerHTML = "";
        userDetailError = false;
    }

    if(userDetailError) return false;
    else {
        return true;
    }

}

let displayUserDetail = () => {    
    var d = new Date(Date.now());
    var date = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();

    var selectedProvince = "";

    switch (province) {
        case 'alberta':
            selectedProvince = "Alberta";
            break;
        case 'bc':
            selectedProvince = "British Columbia";
            break;
        case 'manitoba':
            selectedProvince = "Manitoba";
            break;
        case 'new_brunswick':
            selectedProvince = "New Brunswick";
            break;   
        case 'new_found_labra':
            selectedProvince = "New Foundland and Labrador";
            break;
        case 'nortwest':
            selectedProvince = "Northwest Territories";
            break;
        case 'nova_scotia':
            selectedProvince = "Nova Scotia";
            break;
        case 'nunavut':
            selectedProvince = "Nunavut";
            break;
        case 'ontario':
            selectedProvince = "Ontario";
            break;
        case 'edward_island':
            selectedProvince = "Prince Edward Island";
            break;
        case 'quebec':
            selectedProvince = "Quebec";
            break;
        case 'sas':
            selectedProvince = "Saskatchewan";
            break;
        case 'yukon':
            selectedProvince = "Yukon";
            break; 
        default:
            break;
    }

    userDetailReceiptData  = `
            <h2>Receipt</h2>
            <hr class="line">
            <h5 class="date">Date: ${date}</h5>
            <div class="details">
                <div class="userDetail">
                    Name : ${customerName}<br>
                    Mobile Number : ${phone}<br>
                    Email : ${email}<br>
                    Address : ${address}, ${city}, ${selectedProvince}, ${postcode}
                </div>
                <div class="checkputDetail">
                    Card Number : ${cardNumber}<br>
                    Expiry Month : ${expMonth}<br>
                    Expiry Year : ${expYear}<br>
                </div>
            </div>
            <table>
                <tr class="tableHeader">
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Amount</th>
                </tr>
    `;

};

let displayBill = () => {
    cartBillAllRows = selectedProduct
        .map((x) => {
          let { id, item } = x;
          let searchItem = productDetail.find((i) => i.id == id) || [];
          return `
                <tr>
                    <td>${searchItem.name}</td>
                    <td>${item} </td>
                    <td>$${searchItem.price}</td>
                    <td>$${searchItem.price * item}</td>
                </tr>
                
        `;
        }).join("");
        cartBillData = `<tbody> ${cartBillAllRows}`
  };


let displayTotal = () => {

    let subTotal = selectedProduct
    .map((x) => {
      let { item, id } = x;
      let searchItem = productDetail.find((y) => y.id == id) || [];

      return item * searchItem.price;
    })
    .reduce((x, y) => x + y, 0);

    var taxRate = 0;

    if(province == "alberta" || province == "nortwest" || province == "nunavut" || province == "yukon"){
        taxRate = 0.05;
    } else if (province == "bc" || province == "manitoba" || province == "manitoba") {
        taxRate = 0.12
    } else if (province == "new_brunswick" || province == "new_found_labra" || province == "nova_scotia" || province == "edward_island") {
        taxRate = 0.15
    } else if (province == "ontario") {
        taxRate = 0.13
    } else {
        taxRate = 0.1497
    }

    var tax = subTotal * taxRate;
    var total = subTotal + tax;

    billAmountData = `
                <tr>
                    <td></td>
                    <td></td>
                    <td><h5>Sub total<h5></td>
                    <td><h5>$${subTotal.toPrecision(4)}<h5></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><h5>Tax<h5></td>
                    <td><h5>$${tax.toPrecision(4)}<h5></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td><h5>Total<h5></td>
                    <td><h5>$${total.toPrecision(4)}<h5></td>
                </tr>
            </tbody>
        </table>
        <div class="greetings">
            <h5>Thank you for choosing us!</h5>
        </div>
        `;
  }

    let cardNumber = "";
    let expMonth = "";
    let expYear = "";
    let email = "";
    let password = "";
    let conpassword = "";

function validateCheckoutData(){

    cardNumber = document.getElementById("cardnumber").value;
    expMonth = document.getElementById("month").value;
    expYear = document.getElementById("year").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    conpassword = document.getElementById("conpassword").value;

    let errors = false;

    emailRegex = /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/

    cardRegex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/

    let subTotal = selectedProduct
        .map((x) => {
          let { item, id } = x;
          let searchItem = productDetail.find((y) => y.id == id) || [];
  
          return item * searchItem.price;
        });

    if(subTotal < 10) {
        document.getElementById("errCheckout").innerHTML = "You have to purhcase products worth $10 or more for generating a receipt";
        errors = true;
    } else {
        document.getElementById("errCheckout").innerHTML = "";
    }

    if (userDetailError) {
        document.getElementById("errCheckout").innerHTML = "You have to enter contact detail first";
        errors = true;
    } else {
        document.getElementById("errCheckout").innerHTML = "";
    }

    if (cardNumber == ""){
        document.getElementById("errCardNumber").innerHTML = "Please enter card number";
        errors = true;
    }
    else if (cardRegex.test(cardNumber) == false){
        document.getElementById("errCardNumber").innerHTML = "Please enter valid card number";
        errors = true;
    }
    else {
        document.getElementById("errCardNumber").innerHTML = "";
    }

    if (expMonth == "")
    {
        document.getElementById("errMonth").innerHTML = "Select expiry month";
        errors = true;
    }
    else {
        document.getElementById("errMonth").innerHTML = "";
    }

    if (expYear == "")
    {
        document.getElementById("errYear").innerHTML = "Select expiry year";
        errors = true;
    }
    else {
        document.getElementById("errYear").innerHTML = "";
    }

    if (email == ""){
        document.getElementById("errEmail").innerHTML = "Please enter email address";
        errors = true;
    }
    else if (emailRegex.test(email) == false){
        document.getElementById("errEmail").innerHTML = "Please enter valid email address";
        errors = true;
    }
    else {
        document.getElementById("errEmail").innerHTML = "";
    }

    if (password == "")
    {
        document.getElementById("errPassword").innerHTML = "Please enter your password";
        errors = true;
    }
    else {
        document.getElementById("errPassword").innerHTML = "";
    }

    if (conpassword == "")
    {
        document.getElementById("errConPassword").innerHTML = "Please enter confirm password";
        errors = true;
    } 
    else if (password != conpassword){
        document.getElementById("errConPassword").innerHTML = "Both password didn't match";
        errors = true;
    }
    else {
        document.getElementById("errConPassword").innerHTML = "";
    }

    if(errors) { 
        return false;
    } else {
        generateReceipt.classList.add('main-box');
        finalDisplayUserDetailReceipt();
        return true;
    }

}

function finalDisplayUserDetailReceipt() {
    displayUserDetail();
    displayBill();
    displayTotal();
    const userFinalReceiptData = userDetailReceiptData.concat(cartBillData).concat(billAmountData);
    console.log('userFinalReceiptData :>> ', userFinalReceiptData);
    userFinalReceipt.innerHTML = userFinalReceiptData;
}

generateReceipt.classList.add('main-box');
finalDisplayUserDetailReceipt();


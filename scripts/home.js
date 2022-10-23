let product = document.getElementById("pro-container");

let selectProduct = JSON.parse(localStorage.getItem("product")) || [];

let displayProductDetails = () => {
    console.log('productDetail', productDetail);
    return (product.innerHTML = productDetail
      .map((item) => {
        let { id, name, price, img } = item;
        return `
        <div class="pro" id="product-id-${id}">
            <img src=${img} alt="Products">
            <div class="des">
                <h5>${name}</h5>
                <h4>$${price}</h4>
                <a href="#" ><i onclick="addToCart(${id})" class="fal fa-shopping-cart cart"></i></a>
            </div>
        </div>
      `;
      })
      .join(""));
  };
  
  displayProductDetails();

  let addToCart = (selectedItemId) => {
    let searchItem = selectProduct.find((item) => item.id === selectedItemId);
    if (searchItem === undefined) {
        selectProduct.push({
        id: selectedItemId,
        item: 1,
      });
      localStorage.setItem("product", JSON.stringify(selectProduct));
      alert("Item is successfully add into cart");
    } else {
      alert("Item is already added into cart");
    }
  };

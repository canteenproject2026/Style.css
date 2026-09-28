let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push({ name: name, price: price });
  total += price;
  showCart();
}

function showCart() {
  let cartDiv = document.getElementById("cart");

  if (cart.length === 0) {
    cartDiv.innerHTML =
      "<p>अजून कोणतीही वस्तू निवडलेली नाही.</p>";
  } else {
    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
      cartDiv.innerHTML += `
        <div class="cart-item">
          <span>${item.name} - ₹${item.price}</span>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      `;
    });
  }

  document.getElementById("total").innerText =
    "Total: ₹" + total;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  showCart();
}

function placeOrder() {
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let time = document.getElementById("time").value;
  let payment = document.getElementById("payment").value;
  let message = document.getElementById("message");

  if (cart.length === 0) {
    message.innerText = "❌ कृपया आधी Food निवडा.";
    return;
  }

  if (name === "" || phone === "" || time === "" || payment === "") {
    message.innerText = "❌ कृपया सर्व माहिती भरा.";
    return;
  }

  let orderId =
    "ORD" + Math.floor(1000 + Math.random() * 9000);

  message.innerHTML = `
    ✅ Order Successfully Placed!<br><br>
    🎫 Order ID: ${orderId}<br>
    👤 Name: ${name}<br>
    💰 Total: ₹${total}<br>
    ⏰ Pickup: ${time}
  `;

  cart = [];
  total = 0;
  showCart();
}

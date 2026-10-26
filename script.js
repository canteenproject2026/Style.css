import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaL6H-TSAQIkYvWaMJ8uEL5dbNyziYMyo",
  authDomain: "college-canteen-4c18e.firebaseapp.com",
  databaseURL: "https://college-canteen-4c18e-default-rtdb.firebaseio.com",
  projectId: "college-canteen-4c18e",
  storageBucket: "college-canteen-4c18e.firebasestorage.app",
  messagingSenderId: "295672145126",
  appId: "1:295672145126:web:09c761576eb0cd3a4f8727",
  measurementId: "G-Z2CZBN1RG1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let cart = [];
let total = 0;

function addItem(name, price) {
  cart.push({ name, price });
  total += price;
  showCart();
}

function showCart() {
  const cartDiv = document.getElementById("cart");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>अजून कोणतीही वस्तू निवडलेली नाही.</p>";
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

  document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  showCart();
}

async function placeOrder() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const time = document.getElementById("time").value;
  const payment = document.getElementById("payment").value;
  const message = document.getElementById("message");

  if (cart.length === 0) {
    message.innerText = "❌ कृपया आधी Food निवडा.";
    return;
  }

  if (name === "" || phone === "" || time === "" || payment === "") {
    message.innerText = "❌ कृपया सर्व माहिती भरा.";
    return;
  }

  const orderId =
    "ORD" + Math.floor(1000 + Math.random() * 9000);

  const orderData = {
    orderId: orderId,
    name: name,
    phone: phone,
    items: cart,
    total: total,
    pickupTime: time,
    payment: payment,
    status: "New",
    createdAt: new Date().toISOString()
  };

  try {
    const newOrderRef = push(ref(database, "orders"));
    await set(newOrderRef, orderData);

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

  } catch (error) {
    console.error(error);
    message.innerText =
      "❌ Order save nahi hua. Firebase connection check karo.";
  }
}

window.addItem = addItem;
window.removeItem = removeItem;
window.placeOrder = placeOrder;

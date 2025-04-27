const price = document.getElementById("price");
const ads = document.getElementById("ads");
const taxes = document.getElementById("taxes");
const discount = document.getElementById("discount");
const total = document.getElementById("total");
const count = document.getElementById("count");
const addForm = document.getElementById("add-form");
const tableWrapper = document.getElementById("table-wrapper");
const tableBody = document.getElementById("table-body");
const searchInput = document.getElementById("search-input");
const searchByTitleButton = document.getElementById("search-by-title-btn");
const noProductsTitle = document.getElementById("no-products-title");
const searchByCategoryButton = document.getElementById(
  "search-by-category-btn"
);
const submitButton = document.getElementById("submit-btn");
const toast = document.getElementById("toast");

let products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

// Get total
const getTotal = () => {
  let result = +price.value + +ads.value + +taxes.value - +discount.value;
  total.innerHTML = result;

  if (result > 0) {
    total.style.background = "#0b5383";
  } else {
    total.style.background = "#830b0b";
  }
};

price.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

// Create new product
addForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);

  const data = Object.fromEntries(formData);

  const product = {
    ...data,
    id: Math.floor(100000 + Math.random() * 900000),
  };

  const productCount = count.value || 1;

  for (let i = 0; i < productCount; i++) {
    const newProduct = {
      ...product,
      id: Math.floor(100000 + Math.random() * 900000),
    };
    products.push(newProduct);
  }

  addForm.reset();

  showData();

  localStorage.setItem("products", JSON.stringify(products));
});

// Show data
const showData = () => {
  tableBody.innerHTML = products
    .map((product) => {
      return `<tr data-id="${product.id}">
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.ads}</td>
      <td>${product.discount > 0 ? product.discount : "-"}</td>
      <td>${product.total}</td>
      <td>${product.category}</td>
      <td>
        <button class="update-btn" type="button">Update</button>
      </td>
      <td>
        <button class="delete-btn" type="button">Delete</button>
      </td>
    </tr>`;
    })
    .join("");
};

showData();

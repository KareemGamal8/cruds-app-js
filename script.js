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
let activeProductId = null;

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
    id: activeProductId ?? Math.floor(100000 + Math.random() * 900000),
    total: total.innerHTML,
  };

  const productCount = count.value || 1;

  if (!activeProductId) {
    for (let i = 0; i < productCount; i++) {
      const newProduct = {
        ...product,
        id: Math.floor(100000 + Math.random() * 900000),
      };

      showToast("Product added successfully!");

      products.push(newProduct);
    }
  } else {
    products = products.map((item) =>
      item.id === activeProductId ? product : item
    );

    showToast("Product updated successfully!");
  }

  addForm.reset();

  showData();

  localStorage.setItem("products", JSON.stringify(products));
});

// Show data
const showData = (data = products) => {
  tableBody.innerHTML = data
    .map((product) => {
      return `<tr data-id="${product.id}">
      <td>${product.id}</td>
      <td>${product.title}</td>
      <td>${product.price}</td>
      <td>${product.taxes}</td>
      <td>${product.ads}</td>
      <td>${product.discount > 0 ? product.discount : "-"}</td>
      <td>${product.total || 0}</td>
      <td>${product.category}</td>
      <td>
        <button class="update-btn" type="button" onclick="updateProduct(${
          product.id
        })">Update</button>
      </td>
      <td>
        <button class="delete-btn" type="button" onclick="deleteProduct(${
          product.id
        })">Delete</button>
      </td>
    </tr>`;
    })
    .join("");
};

showData();

// Update product
const updateProduct = (id) => {
  const selectedProduct = products.find((product) => product.id === Number(id));

  title.value = selectedProduct.title;
  price.value = selectedProduct.price;
  ads.value = selectedProduct.ads;
  taxes.value = selectedProduct.taxes;
  discount.value = selectedProduct.discount;
  total.innerHTML = selectedProduct.total;
  category.value = selectedProduct.category;
  count.style.display = "none";
  submitButton.innerHTML = "Update";
  activeProductId = id;
};

// Delete product
const deleteProduct = (id) => {
  products = products.filter((product) => product.id !== id);

  showData();

  localStorage.setItem("products", JSON.stringify(products));

  showToast("Product deleted successfully!");
};

const searchProducts = (type) => {
  if (!searchInput.value) {
    showData();
    return null;
  }

  let filteredProducts = [];

  if (type === "category") {
    filteredProducts = products.filter(
      (product) => product.category === searchInput.value
    );
  } else if (type === "title") {
    filteredProducts = products.filter((product) =>
      product.title.toLowerCase().includes(searchInput.value.toLowerCase())
    );
  }

  showToast("Products filtered successfully");

  showData(filteredProducts);
};

searchByTitleButton.addEventListener("click", () => {
  searchProducts("title");
});

searchByCategoryButton.addEventListener("click", () => {
  searchProducts("category");
});

// Show toast

const showToast = (message) => {
  toast.innerHTML = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 3000);
};

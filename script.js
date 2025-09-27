const form = document.getElementById("expense-form");
const tableBody = document.getElementById("expense-table");
const cardContainer = document.getElementById("expense-cards");
const totalExpenseEl = document.getElementById("total-expense");
const sortDateBtn = document.getElementById("sort-date-btn");

let expenses = [];
let dateSortAsc = true; // track sort direction

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  const expense = { date, category, description, amount };
  expenses.push(expense);

  renderExpenses();
  form.reset();
});

// Render expenses in table and cards
function renderExpenses() {
  tableBody.innerHTML = "";
  cardContainer.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;

    // Table row
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2 text-sm text-gray-700">${exp.date}</td>
      <td class="px-4 py-2 text-sm text-gray-700">
        <span class="badge ${getCategoryColor(exp.category)}">${
      exp.category
    }</span>
      </td>
      <td class="px-4 py-2 text-sm text-gray-700">${exp.description}</td>
      <td class="px-4 py-2 text-sm text-gray-700">&#8377;${exp.amount.toFixed(
        2
      )}</td>
      <td class="px-4 py-2 text-sm">
        <button onclick="deleteExpense(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);

    // Mobile card
    const card = document.createElement("div");
    card.className =
      "bg-purple-50 p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col gap-1";
    card.innerHTML = `
      <div class="text-sm text-gray-700"><strong>Date:</strong> ${
        exp.date
      }</div>
      <div class="text-sm text-gray-700"><strong>Category:</strong> <span class="badge ${getCategoryColor(
        exp.category
      )}">${exp.category}</span></div>
      <div class="text-sm text-gray-700"><strong>Description:</strong> ${
        exp.description
      }</div>
      <div class="text-sm text-gray-700"><strong>Amount:</strong> &#8377;${exp.amount.toFixed(
        2
      )}</div>
      <button onclick="deleteExpense(${index})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mt-2 transition w-1/2">Delete</button>
    `;
    cardContainer.appendChild(card);
  });

  totalExpenseEl.innerText = total.toFixed(2);
}

// Delete expense
function deleteExpense(index) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenses.splice(index, 1);
    renderExpenses();
  }
}

// Category colors
function getCategoryColor(category) {
  const colors = {
    Food: "bg-purple-500",
    Transport: "bg-pink-500",
    Shopping: "bg-indigo-500",
    Entertainment: "bg-violet-500",
    Others: "bg-pink-400",
  };
  return colors[category] || "bg-gray-500";
}

// Sort by Date Button
sortDateBtn.addEventListener("click", () => {
  expenses.sort((a, b) => {
    return dateSortAsc
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  });
  renderExpenses();
  sortDateBtn.textContent = dateSortAsc ? "Sort by Date ↓" : "Sort by Date ↑";
  dateSortAsc = !dateSortAsc;
});

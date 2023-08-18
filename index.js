// INCOME
let incomeTitle = document.getElementById("income-title");
const incomeAmount = document.getElementById("income-amount");
const addAmountButton = document.getElementById("add-amount");
const incomeList = document.getElementById("income-list");

const incomeLi = [];
let incomeTotal = 0;

//COST
const costTitle = document.getElementById("cost-title");
const costAmount = document.getElementById("cost-amount");
const addCostButton = document.getElementById("add-cost");
const costList = document.getElementById("cost-list");

const costLi = [];
let costTotal = 0;

// BALANCE

function updateUI() {
  const transactionsDiv = document.getElementById("income-list");
  transactionsDiv.innerHTML = "";

  const costDiv = document.getElementById("cost-list");
  costDiv.innerHTML = "";

  incomeLi.forEach((incomeLi, index) => {
    transactionsDiv.innerHTML += `
      <li class="list-items"> 
        <div class="list-text">
          ${incomeLi.type}: ${incomeLi.amount} PLN 
        </div> 
           <div class="buttons">
              <button class="edit" onclick="editTransaction(${index})">Edytuj <i class="fa-solid fa-pen-to-square"></i></button>
             <button class="delete" onclick="deleteTransaction(${index})">Usuń <i class="fa-solid fa-xmark"></i></button>
           </div>
      </li>`;
  });

  costLi.forEach((costLi, index) => {
    costDiv.innerHTML += `
      <li class="list-items"> 
        <div class="list-text">  
          ${costLi.type}: ${costLi.amount} PLN 
        </div>
            <div class="buttons">
              <button class="edit" onclick="editCostTransaction(${index})">Edytuj <i class="fa-solid fa-pen-to-square"></i></button>
              <button class="delete" onclick="deleteCostTransaction(${index})">Usuń <i class="fa-solid fa-xmark"></i></button>
            </div>
       </li>`;
  });

  balance = incomeTotal - costTotal;

  const balanceDiv = document.getElementById("header");
  if (balance > 0) {
    balanceDiv.innerText = `Możesz jeszcze wydać ${balance.toFixed(2)} PLN`;
  } else if (balance === 0) {
    balanceDiv.innerText = "Bilans wynosi zero";
  } else {
    balanceDiv.innerText = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} PLN`;
  }
}

//INCOME INPUT

function income() {
  const incomeText = incomeTitle.value;
  if (incomeText !== "") {
    const incomeNumber = parseFloat(incomeAmount.value).toFixed(2);
    if (!isNaN(incomeNumber) && incomeNumber > 0) {
      incomeLi.push({ type: `${incomeText}`, amount: `${incomeNumber}` });
      incomeTotal += parseFloat(incomeNumber);
      totalIncomeAmount();
      updateUI();
      incomeAmount.value = "";
      incomeTitle.value = "";
    } else {
      alert("Minialna kwota to 0.01 PLN !");
    }
  } else {
    alert("Nie podano nazwy przychodu");
  }
}

//  INCOME EDIT

function editTransaction(index) {
  const listItem = incomeLi[index];

  const modalInput = document.createElement("dialog");
  modalInput.setAttribute("class", "modal");

  const editForm = document.createElement("form");
  editForm.setAttribute("method", "dialog");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Nowa nazwa: ";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = listItem.type;

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Nowa kwota: ";
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = listItem.amount;

  const submitButton = document.createElement("button");
  submitButton.setAttribute("class", "saveButton");
  submitButton.textContent = "Zapisz";

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "cancelButton");
  cancelButton.textContent = "Anuluj";

  modalInput.appendChild(editForm);
  editForm.appendChild(nameLabel);
  editForm.appendChild(nameInput);
  editForm.appendChild(document.createElement("br"));
  editForm.appendChild(amountLabel);
  editForm.appendChild(amountInput);
  editForm.appendChild(document.createElement("br"));
  editForm.appendChild(submitButton);
  editForm.appendChild(cancelButton);

  cancelButton.addEventListener("click", function (event) {
    event.preventDefault();
    updateUI();
  });

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    const newIncomeText = nameInput.value.trim();
    if (newIncomeText !== "") {
      const newAmount = parseFloat(amountInput.value).toFixed(2);
      if (!isNaN(newAmount) && newAmount > 0) {
        const oldAmount = listItem.amount;
        listItem.type = newIncomeText;
        incomeTotal -= oldAmount;
        listItem.amount = newAmount;
        incomeTotal += parseFloat(newAmount);
        totalIncomeAmount();
        updateUI();

        if (modalInput.parentNode) {
          listItem.removeChild(modalInput);
        }
      } else {
        alert("Minialna kwota to 0.01 PLN !");
      }
    } else {
      alert("Nie podano nazwy przychodu");
    }
  });

  incomeList.appendChild(modalInput);
  modalInput.showModal();
}

// INCOME DELETE

function deleteTransaction(index) {
  const amount = incomeLi[index].amount;
  incomeLi.splice(index, 1);
  if (amount > 0) {
    incomeTotal -= amount;
  }
  totalIncomeAmount();
  updateUI();
}

// TOTAL INCOME
function totalIncomeAmount() {
  const totalIncomeAmount2 = document.getElementById("total-income");
  totalIncomeAmount2.innerHTML = "";
  totalIncomeAmount2.innerHTML += `Łącznie przychodow: ${parseFloat(
    incomeTotal
  )} PLN`;
}

// COST INPUT

function cost() {
  const costText = costTitle.value;
  if (costText !== "") {
    const costNumber = parseFloat(costAmount.value).toFixed(2);
    if (!isNaN(costNumber) && costNumber > 0) {
      costLi.push({ type: `${costText}`, amount: `${costNumber}` });
      costTotal += parseFloat(costNumber);
      totalCostAmount();
      updateUI();
      costTitle.value = "";
      costAmount.value = "";
    } else {
      alert("Minialna kwota to 0.01 PLN !");
    }
  } else {
    alert("Nie podano nazwy wydatku");
  }
}

// COST EDIT

function editCostTransaction(index) {
  const costListItem = costLi[index];

  const modalInput = document.createElement("dialog");
  modalInput.setAttribute("class", "modal");

  const editForm = document.createElement("form");
  editForm.setAttribute("method", "dialog");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Nowa nazwa: ";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.value = costListItem.type;

  const amountLabel = document.createElement("label");
  amountLabel.textContent = "Nowa kwota: ";
  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.value = costListItem.amount;

  const submitCostButton = document.createElement("button");
  submitCostButton.setAttribute("class", "saveButton");
  submitCostButton.textContent = "Zapisz";

  const cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "cancelButton");
  cancelButton.textContent = "Anuluj";

  modalInput.appendChild(editForm);
  editForm.appendChild(nameLabel);
  editForm.appendChild(nameInput);
  editForm.appendChild(document.createElement("br"));
  editForm.appendChild(amountLabel);
  editForm.appendChild(amountInput);
  editForm.appendChild(document.createElement("br"));
  editForm.appendChild(submitCostButton);
  editForm.appendChild(cancelButton);

  cancelButton.addEventListener("click", function (event) {
    event.preventDefault();
    updateUI();
  });

  submitCostButton.addEventListener("click", function (event) {
    event.preventDefault();

    const newCostText = nameInput.value.trim();
    if (newCostText !== "") {
      const newCostAmount = parseFloat(amountInput.value).toFixed(2);
      if (!isNaN(newCostAmount) && newCostAmount > 0) {
        const oldCostAmount = costListItem.amount;
        costListItem.type = newCostText;
        costTotal -= oldCostAmount;
        costListItem.amount = newCostAmount;
        costTotal += parseFloat(newCostAmount);
        totalCostAmount();
        updateUI();

        if (modalInput.parentNode) {
          costListItem.removeChild(modalInput);
        }
      } else {
        alert("Minialna kwota to 0.01 PLN ! ");
      }
    } else {
      alert("Nie podano nazwy przychodu");
    }
  });

  costList.appendChild(modalInput);
  modalInput.showModal();
}

// COST DELETE

function deleteCostTransaction(index) {
  const amount = costLi[index].amount;
  costLi.splice(index, 1);
  if (amount > 0) {
    costTotal -= amount;
  }
  totalCostAmount();
  updateUI();
}

// TOTAL COST
function totalCostAmount() {
  const totaLCostAmount = document.getElementById("total-cost");
  totaLCostAmount.innerHTML = "";
  totaLCostAmount.innerHTML += `Łącznie wydatków: ${costTotal.toFixed(2)} PLN`;
}

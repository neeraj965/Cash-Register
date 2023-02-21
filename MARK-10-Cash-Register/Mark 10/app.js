const notesAccepted = [2000, 500, 200, 100, 50, 20, 10, 5, 1];
const form = document.querySelector(".user-input");
const bill = document.querySelector(".bill-amount");
const cash = document.querySelector(".cash-amount");
const error = document.querySelector(".error");
const noteList = document.querySelector(".note-list");
const result = document.querySelector(".result-display");
const toggle = document.querySelector(".toggle-mode");
const root = document.querySelector(":root");


result.style.display = "none";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  result.style.display = "";
  if (Number(cash.value) < Number(bill.value)) {
    noteList.style.display = "none";
    error.textContent = "Cash paid is less than the bill amount!";
  } else if (Number(cash.value) === Number(bill.value)) {
    noteList.style.display = "none";
    error.textContent = "Yayyy! You paid the exact bill amount!";
  } else {
    noteList.style.display = "";
    error.textContent =
      "Amount To Collect: " +
      (Number(cash.value) - Number(bill.value)) +
      "Rupees";
    const notes = cashRegister(
      notesAccepted,
      Number(bill.value),
      Number(cash.value)
    );
    noteList.innerHTML = Object.keys(notes)
      .map((note) => {
        return (
          "<li>" +
          "<span>" +
          note +
          "</span>" +
          "-" +
          "<span>" +
          notes[note] +
          "</span>" +
          "</li>"
        );
      })
      .join("");
  }
  bill.value = "";
  cash.value = "";
});

function cashRegister(notesAccepted, billAmount, cashPaid) {
  const cashToReturn = cashPaid - billAmount;
  const notes = {};
  let bill = cashToReturn;

  for (let i = 0; i < notesAccepted.length; i++) {
    if (bill % notesAccepted[i] === billAmount) {
      notes[notesAccepted[i]] = 0;
    } else {
      notes[notesAccepted[i]] = Math.floor(bill / notesAccepted[i]);
      bill = bill % notesAccepted[i];
    }
  }
  return notes;
}
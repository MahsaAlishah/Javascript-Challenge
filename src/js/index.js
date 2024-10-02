// index.js
import AxiosService from "./AxiosService.js";
import Transactions from "./Transactions.js";

const loadBtn = document.querySelector(".load-Btn");
const loadSection = document.querySelector(".transactions__load");
const displaySection = document.querySelector(".transactions__display");

document.addEventListener("DOMContentLoaded", () => {
  loadBtn.addEventListener("click", async () => {
    loadSection.classList.add("hidden");
    displaySection.classList.remove("hidden");

    const axiosService = new AxiosService();
    const transactions = new Transactions(axiosService);
    await transactions.fetchTransactions();
    transactions.createTransactionsList();
  });
});

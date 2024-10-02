const searchInput = document.querySelector("#search-input");
const sortPriceBtn = document.querySelector(".sort__price-btn");
const sortDateBtn = document.querySelector(".sort__date-btn");

class Transactions {
  constructor(axiosService) {
    this.transactionsList = [];
    this.axiosService = axiosService;

    searchInput.addEventListener("input", (e) => this.searchTransactions(e));
    sortPriceBtn.addEventListener("click", () => this.sortPrice());
    sortDateBtn.addEventListener("click", () => this.sortDate());
  }
  async fetchTransactions(sortField = "price", order = "asc", query = "") {
    this.transactionsList = await this.axiosService.getTransactions(
      sortField,
      order,
      query
    );
    this.transactionsList.forEach((transaction) => {
      const dateObj = new Date(transaction.date);
      const localizedDate = dateObj.toLocaleString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      const dateTimeParts = localizedDate.split(",");
      transaction.date = `${dateTimeParts[0]} ساعت ${dateTimeParts[1]}`;
    });
  }

  createTransactionsList() {
    let result = "";
    let index = 1;
    this.transactionsList.forEach((transaction) => {
      const typeColorClass =
        transaction.type === "افزایش اعتبار" ? "type-green" : "type-red";
      result += `<tr>
                <td>${index++}</td>
                <td class="${typeColorClass}">${transaction.type}</td>
                <td>${transaction.price}</td>
                <td>${transaction.refId}</td>
                <td>${transaction.date}</td>
              </tr>`;
    });
    const container = document.getElementsByTagName("tbody")[0];
    container.innerHTML = result;
  }

  async searchTransactions(e) {
    const query = e.target.value.trim();
    await this.fetchTransactions("", "", query);
    this.createTransactionsList();
  }

  async sortPrice() {
    console.log("Sorting by price");
    if (sortPriceBtn.classList.contains("rotated")) {
      sortPriceBtn.classList.remove("rotated");
      await this.fetchTransactions("price", "asc");
    } else {
      sortPriceBtn.classList.add("rotated");
      await this.fetchTransactions("price", "desc");
    }

    this.createTransactionsList();
  }

  async sortDate() {
    console.log("Sorting by date");
    if (sortDateBtn.classList.contains("rotated")) {
      sortPriceBtn.classList.remove("rotated");
      await this.fetchTransactions("date", "asc");
    } else {
      sortDateBtn.classList.add("rotated");
      await this.fetchTransactions("date", "desc");
    }
    this.createTransactionsList();
  }
}

export default Transactions;

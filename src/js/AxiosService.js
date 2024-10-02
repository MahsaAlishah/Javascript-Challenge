// axiosservice.js
class AxiosService {
  constructor() {
    this.app = axios.create({ baseURL: "http://localhost:3000" });

    // Add request and response interceptors
    this.app.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    );

    this.app.interceptors.response.use(
      (response) => {
        console.log("Successfully fetched");
        return response;
      },
      (error) => {
        console.error("Error fetching data:", error.message);
        return Promise.reject(error);
      }
    );
  }

  async getTransactions(sortField = "price", order = "asc", query) {
    try {
      const { data } = await this.app.get("/transactions", {
        params: {
          _sort: sortField,
          _order: order,
          refId_like: query,
        },
      });
      console.log({ data });

      return data;
    } catch (err) {
      console.error("Error in getTransactions:", err.message);
      throw err;
    }
  }
}

export default AxiosService;

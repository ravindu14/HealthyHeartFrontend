import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class FoodService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiFood: string = "http://52.255.157.87:5000/food";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getFoodPrediction(payload) {
    return axios.post("http://52.255.157.87:5000/food", payload);
  }

  getMealPlan(payload) {
    return Math.floor(Math.random() * 5 + 1);
  }
}

export default FoodService;

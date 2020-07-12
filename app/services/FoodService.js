import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class FoodService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiFood: string = "http://52.149.8.145:5000/expression";
  //pythonApiMealPlan: string = "http://tdasun94.pythonanywhere.com/meal_plan";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getScannedFood(payload) {
    return axios.post(this.pythonApiFood, payload);
  }

  getMealPlan(payload) {
    return Math.floor(Math.random() * 5 + 1);
  }
}

export default FoodService;
import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class AuthService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiRiskAnalysis: string = "http://52.163.126.150/PredictHeart";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  login(payload: Object) {
    return this.api.post(`${this.endpoint}/login`, payload);
  }

  register(payload: Object) {
    return this.api.post(`${this.endpoint}/register`, payload);
  }

  getUserData() {
    return this.api.get(`${this.endpoint}/userData`);
  }

  updateUser(payload: Object) {
    return this.api.put(`${this.endpoint}/profile`, payload);
  }

  getHeartRateFromBT() {
    return this.api.get(`${this.endpoint}/userData`);
  }

  getRiskAnalysis(payload) {
    return axios.post(this.pythonApiRiskAnalysis, payload);
  }
}

export default AuthService;

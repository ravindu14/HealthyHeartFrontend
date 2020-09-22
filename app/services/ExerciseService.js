import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class ExerciseService {
  api: ApiServiceInterface;

  endpoint: string = "/exercises";
  pythonApiExLeg: string = "http://52.255.157.87:5000/getlegsshedule";
  pythonApiExArm: string = "http://52.255.157.87:5000/getarmsshedule";
  pythonApiExAbs: string = "http://52.255.157.87:5000/getabsshedule";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getLegsExercises(payload) {
    console.log(payload);
    return axios.post(this.pythonApiExLeg, payload);
  }

  getArmsExercises(payload) {
    console.log(payload);
    return axios.post(this.pythonApiExArm, payload);
  }

  getAbsExercises(payload) {
    return axios.post(this.pythonApiExAbs, payload);
  }

  getApiExercises() {
    return this.api.get(this.endpoint);
  }

  saveExercisesToApi(payload) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }
}

export default ExerciseService;

import axios from "axios"
import {CredentialsModel} from "@/models/CredentialsModel";

const service = axios.create({
  baseURL: "/",
  withCredentials: true,
  withXSRFToken: true
});

export const signIn = async (credentials: CredentialsModel) => {
  await service.get("/sanctum/csrf-cookie", {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });

  return service.post("/api/login", credentials, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  });
}

import axios from "axios";
const url = "http://localhost:8080";

async function SignInRequest(email: string, password: string) {
  const result = await axios.post(`${url}/v1/user/login`, {
    email,
    password,
  });

  return result.data;
}

async function GetById(token: string) {
  const result = await axios.get(`${url}/v1/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return result.data;
}

export { SignInRequest, GetById };

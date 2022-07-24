import { API_BASE_URL } from "./app-config";
import {cookie} from "react-cookie";
import axios from 'axios';
const ACCESS_TOKEN = "ACCESS_TOKEN";


export const call = (api, method, request) => {
  let header = new Headers({
    "Content-Type": "application/json",
  });

  // 로컬 스토리지에서 ACCESS TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken != null) {
    header.append("Authorization", null);
  }

  let options = {
    headers: header,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET method
    options.data = request;
  }
  return axios(options)
    .then((response) =>
     {
      if(response.status === 200){
        console.log("true")
        console.log(response.ok)
        return response
      }else if(response.status === 403){
        window.location.href = "/login" ; // redirect
      }
      else{
        window.location.href = "/login" ; // redirect
      }
      
      })
}

export const signin = (userDTO) => {
  return call("/login", 'POST', userDTO).then((response) => {
    let jwt = response.headers.authorization;
    if(jwt !== null){
      localStorage.setItem(ACCESS_TOKEN, jwt);
    }
    
  });
}

export const signout = () => {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}


export const signup = (userDTO) => {
  return call("/join", "POST", userDTO);
}

export const googlelogin =() =>{
  return call("//oauth2/authorization/google","GET");

}
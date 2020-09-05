import { getCookie } from "../services/cookie";

const fetchReq = require("node-fetch");
const apiUrl = "https://project-10521262.herokuapp.com/";

export const makeGet = async (url: string) => {

    const cookieAuth = getCookie("token");

    let fetchData = {
        method: "GET",
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization" : cookieAuth
        }
      };

    return await fetchReq(apiUrl + url, fetchData, {
        method: "GET"
      }).then(res => res.json());
};

export const makeDelete = async (url: string, id: string) => {

  const cookieAuth = getCookie("token");

  let fetchData = {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization" : cookieAuth
      }
    };

  return await fetchReq(`${apiUrl}${url}/${id}`, fetchData, {
    }).then(res => res.json());
};

export const makePost = async (url: string, postData ) => {
    let fetchData = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...postData
          })
      };

    return await fetchReq(apiUrl + url, fetchData, {
        method: "POST"
      }).then(res => res.json());
};

export const makePostWithAuth = async (url: string, postData, isPut: boolean = false ) => {

     const cookieAuth = getCookie("token");
 
     let fetchData = {
           method: isPut ? "PUT" : "POST",
           headers: {
             Accept: "application/json",
             "Content-Type": "application/json",
             "Authorization": cookieAuth
           },
           withCredentials: true,
           body: JSON.stringify({
             ...postData
           })
       };
 
     return await fetchReq(apiUrl + url, fetchData, {
         method: "POST"
       }).then(res => res.json()).catch((err) => {
          // tslint:disable-next-line: no-console
          console.log(err);
       });
 };
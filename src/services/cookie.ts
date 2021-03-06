export const setCookie = (cname: string, cvalue: string): void => {
  var d = new Date();
  d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};

export const deleteCookie = (cname: string): void => {
  document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const getCookie = (cname: string): string => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteSession = (): void => {
  deleteCookie("token");
  localStorage.removeItem("persist:root");
};

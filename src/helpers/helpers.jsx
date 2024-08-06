export const getParams = (data) => {
  let params = "";
  Object.keys(data).map((item) => {
    data[item].length > 0 && (params += `${item}=${data[item].join(",")}`);
    params += "&";
  });
  return params;
};

export const getAEDPrice = (price) => {
  return parseFloat(price.split(",").join(".")) * (4.1).toFixed(2);
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const colors = {
  pending: "yellow",
};

export function capitalizeFirstLetter(text) {
  if (text == "") {
    return "";
  }
  console.log(text, "tedfgd");
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
}
export const formatText = (str) => {
  if (!str) return;

  if (typeof str === "string") {
    let words = str.split("_");

    let capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    return capitalizedWords.join(" ");
  } else {
    return str;
  }
};

export const currentPage = () => {
  const pathname = window.location.pathname;
  const pages = ["users", "products", "order_detail", "orders", "dashboard"];
  let page;
  for (const element of pages) {
    if (pathname.includes(element)) {
      page = element;
      break;
    }
  }
  return page;
};

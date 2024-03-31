import * as NProgress from "nprogress";

export const strVNForSearch = (str) => {
  return str
    ? str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    : str;
};

export const removeUndefined = (obj) => {
  for (var prop in obj) {
    if (
      obj[prop] === null ||
      obj[prop] === undefined ||
      obj[prop] === "" ||
      obj[prop]?.length == 0
    ) {
      delete obj[prop];
    }
  }
  return obj;
};

export const wrapperRouterPush = (router, link) => {
  NProgress.start();
  router.push(link);
  // setTimeout(() => {
  //   NProgress.done();
  // }, 3000);
};

export const formatWorkingDays = (workingDays) => {
  const sortedDays = workingDays;
  let result = "";
  let startRange = sortedDays[0].id;

  for (let i = 1; i < sortedDays.length; i++) {
    if (sortedDays[i].id !== sortedDays[i - 1].id + 1) {
      if (result !== "") {
        result += ", ";
      }
      if (startRange === sortedDays[i - 1].id) {
        result += startRange === 8 ? "Chủ nhật" : `Thứ ${startRange}`;
      } else {
        result += `Thứ ${startRange} -`;
        if (sortedDays[i - 1].id === 8) {
          result += " Chủ nhật";
        } else {
          result += ` Thứ ${sortedDays[i - 1].id}`;
        }
      }
      startRange = sortedDays[i].id;
    }
  }

  if (result !== "") {
    result += ", ";
  }
  if (startRange === sortedDays[sortedDays.length - 1].id) {
    result += startRange === 8 ? "Chủ nhật" : `Thứ ${startRange}`;
  } else {
    result += `Thứ ${startRange} - `;
    if (sortedDays[sortedDays.length - 1].id === 8) {
      result += " Chủ nhật";
    } else {
      result += `  Thứ ${sortedDays[sortedDays.length - 1].id}`;
    }
  }

  return result;
};

export const ratingPointToText = (point) => {
  if (point >= 1.0 && point <= 4.9) {
    return "Kém";
  } else if (point >= 5.0 && point <= 6.9) {
    return "Trung bình";
  } else if (point >= 7.0 && point <= 7.9) {
    return "Tốt";
  } else if (point >= 8.0 && point <= 8.9) {
    return "Rất tốt";
  } else if (point >= 9.0 && point <= 10.0) {
    return "Xuất sắc";
  } else {
    return "";
  }
};

export const toSlug = (input) => {
  return (
    input
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
      .normalize("NFD") // Chuyển chuỗi về dạng Unicode Normalization Form D
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các ký tự dấu thanh và dấu mũ
      // .replace(/[^a-z0-9-]/g, "") // Loại bỏ các ký tự không phải là chữ cái, số, hoặc dấu gạch ngang
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .replace(/[^a-z0-9-]/g, "")
  );
};

export const capitalizeFirstLetters = (str) => {
  // Tách chuỗi thành mảng các từ
  var words = str.split(" ");

  // Lặp qua mỗi từ và chuyển đổi chữ cái đầu tiên thành in hoa
  for (var i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Kết hợp lại mảng các từ thành một chuỗi mới và trả về
  return words.join(" ");
};

export function isObjectEmpty(obj) {
  // Kiểm tra bằng cách lặp qua tất cả các thuộc tính của đối tượng
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // Nếu có ít nhất một thuộc tính, đối tượng không rỗng
    }
  }
  return true; // Nếu không có thuộc tính nào, đối tượng rỗng
}

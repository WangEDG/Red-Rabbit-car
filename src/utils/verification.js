//空对象判断
export const Objempty = function (obj) {
  if (Object.keys(obj).length >= 0) {
    return true;
  } else {
    return 123;
  }
}



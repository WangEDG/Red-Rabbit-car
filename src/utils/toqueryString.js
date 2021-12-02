// 对象转query字符串的方法
function query(obj) {
  // 首先判断obj是否为真，为真则进行处理，不然直接return
  if (obj) {
    let query = '';
    for (let i in obj) {
      let value = obj[i];
      if (Array.isArray(value)) {
        value = value.join(',');
      }
      // 进行字符串拼接
      query += `&${i}=${value}`;
    }

    query = query.replace('&', '?');
    // 返回生成的query字符串
    return query;
  }
  return '';
}

export default query;

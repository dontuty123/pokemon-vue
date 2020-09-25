const resetValueObj = {}

  resetValueObj.clear = (data,array) => {
    Object.keys(data).forEach(key => {
      array.push(key);
    })
    array.forEach(e => data[e] = '');
    return data;
  }

  resetValueObj.delete = (data, array) => {
    array.forEach(e => delete data[e]);
    return data;
  }


export default resetValueObj

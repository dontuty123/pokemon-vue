const operater = {}

operater.clear = (data,array) => {
  Object.keys(data).forEach(key => {
    array.push(key);
  })
  array.forEach(e => data[e] = '');
  return data;
}

operater.delete = (data, array) => {
  array.forEach(e => delete data[e]);
  return data;
}

operater.get = () => {
  
}

export default operater

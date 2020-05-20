function getTypeOfValue(value) {
  let currentType = Object.prototype.toString.call(value).split(' ')[1].slice(0, -1).toLowerCase();

  if (!currentType) currentType = '*';

  return currentType[0].toUpperCase() + currentType.substr(1);
}

function getPathType(parentKey = []) {
  return `${parentKey.length ? parentKey.join('.') + '.' : ''}`;
}

function getMaxKeyChild(arr = []) {
  let index = 0;
  let max = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      if (Object.keys(arr[i]).length > max) {
        max = Object.keys(arr[i]).length;
        index = i;
      }
    }
  }
  return index;
}

export function convert(json, parentKey = [], commentType = 'apiSuccess') {
  let obj = json;
  let str = '';
  if (getTypeOfValue(json) === 'String') {
    obj = JSON.parse(json);
  }

  Object.keys(obj).forEach((key) => {
    const type = getTypeOfValue(obj[key]);
    if (type === 'Array') {
      if (obj[key].length) {
        console.log(getTypeOfValue(obj[key][0]));
        str += `* @${commentType} {${getTypeOfValue(obj[key][0])}[]} ${getPathType(parentKey)}${key} \n`;
        const maxKeyChild = getMaxKeyChild(obj[key]);
        if (getTypeOfValue(obj[key][0]) === 'Object')
          return (str += convert(obj[key][maxKeyChild], [...parentKey, key]));
      }
    }

    if (type === 'Object') {
      str += `* @${commentType} {${type}} ${getPathType(parentKey)}${key} \n`;
      return (str += convert(obj[key], [...parentKey, key]));
    }

    if (type !== 'Array') str += `* @${commentType} {${type}} ${getPathType(parentKey)}${key} \n`;
  });

  return str;
}

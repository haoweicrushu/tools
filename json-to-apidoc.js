const a = `{"menu": {
    "header": "SVG Viewer",
    "items": [
        {"id": "Open"},
        {"id": "OpenNew", "label": "Open New"},
        {"id": "ZoomIn", "label": "Zoom In"},
        {"id": "ZoomOut", "label": "Zoom Out"},
        {"id": "OriginalView", "label": "Original View"},
        {"id": "Quality"},
        {"id": "Pause"},
        {"id": "Mute"},
        {"id": "Find", "label": "Find..."},
        {"id": "FindAgain", "label": "Find Again"},
        {"id": "Copy"},
        {"id": "CopyAgain", "label": "Copy Again"},
        {"id": "CopySVG", "label": "Copy SVG"},
        {"id": "ViewSVG", "label": "View SVG"},
        {"id": "ViewSource", "label": "View Source"},
        {"id": "SaveAs", "label": "Save As"},
        {"id": "Help"},
        null,
        {"id": "About", "label": "About Adobe CVG Viewer..."}
    ]
}}`;

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

function r(json, parentKey = [], commentType = 'apiSuccess') {
  let obj = json;
  let str = '';
  if (getTypeOfValue(json) === 'String') {
    obj = JSON.parse(json);
  }

  Object.keys(obj).forEach((key) => {
    const type = getTypeOfValue(obj[key]);
    if (type === 'Array') {
      if (obj[key].length) {
        str += `* @${commentType} {${getTypeOfValue(obj[key][0])}[]} ${getPathType(parentKey)}${key} \n`;
        const maxKeyChild = getMaxKeyChild(obj[key]);
        if (getTypeOfValue(obj[key][0]) === 'Object') return (str += r(obj[key][maxKeyChild], [...parentKey, key]));
      }
    }

    if (type === 'Object') {
      str += `* @${commentType} {${type}} ${getPathType(parentKey)}${key} \n`;
      return (str += r(obj[key], [...parentKey, key]));
    }

    str += `* @${commentType} {${type}} ${getPathType(parentKey)}${key} \n`;
  });

  return str;
}

console.log(r(a));

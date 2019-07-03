const path = require('path');
const fs = require('fs');
// path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
const srcRoot = path.resolve(__dirname, 'src');
const devPath = path.resolve(__dirname, 'dev');
const pageDir = path.resolve(srcRoot, 'page');
const mainFile = 'index.js';

function getEntry() {
  let entryMap = {};
  // fs.readdirSync(path)方法将返回一个包含“指定目录下所有文件名称”的数组对象。
  fs.readdirSync(pageDir).forEach((pathname) => {
    // pathname相对路径，通过path.resolve来获取绝对路径
    let fullPathName = path.resolve(pageDir, pathname);
    // fs.statSync(path)方法返回一个stat数组对象，(读取文件信息)
    let stat = fs.statSync(fullPathName); // 判断路径还是文件
    let fileName = path.resolve(fullPathName, mainFile);
    // isDirectory 判断fullPathName是路径不是文件 并且存在这个文件，获取入口文件
    if(stat.isDirectory() && fs.existsSync(fileName)) {
      entryMap[pathname] = fileName;
    }
  });
  return entryMap;
}

const entryMap = getEntry();

module.exports = {
  mode: 'development',
  entry: entryMap,
  output: {
    path: devPath,
    filename: '[name].min.js'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: srcRoot
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: srcRoot
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192',
        include: srcRoot
      }
    ]
  }
}
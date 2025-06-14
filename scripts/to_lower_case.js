const fs = require('fs')
const path = require('path')

// 获取当前目录下的所有文件和文件夹
const dirs = fs.readdirSync(path.join(__dirname, '..'))

console.log(dirs)
// 遍历目录中的每一个文件/文件夹
dirs.forEach((file) => {
  // 如果是 .md 文件
  if (path.extname(file) === '.md') {
    // 构建原始路径和新路径
    const oldPath = path.join(__dirname, '../', file)
    const newPath = path.join(__dirname, '../', file.toLowerCase())

    // 如果新旧路径不同，则进行重命名
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath)
      console.log(`Renamed: ${oldPath} -> ${newPath}`)
    }
  }
})

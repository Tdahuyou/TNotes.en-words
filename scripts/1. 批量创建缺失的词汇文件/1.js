/**
 * 读取 1.txt 中的单词
 * 将词汇按照一下要求转换
 * 1. 单词都转为小写形式
 * 2. 如果中间有空格，请将空格替换为下划线
 * 3. 将单词插入到指定位置 parh.resolve(__dirname, '..', '..', `${word}.md`)
 *    如果单词文件已存在，则跳过，否则创建一个空的 markdown 文件。
 *    文件名就是上述步骤处理后的单词名。
 *
 * 1.txt 文件中单词格式示例：
 * harbours
 * harsh-spoken
 * harsh
 * Hatuey
 * heard
 *
 *
 * 规范：每一行一个单词
 **/
const fs = require('fs')
const path = require('path')

/**
 * 读取单词列表文件
 */
const filePath = path.resolve(__dirname, '1.txt')

/**
 * 目标目录，单词文件所在位置
 */
const targetDir = path.resolve(__dirname, '..', '..')

const targetFilePaths = []
fs.readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('无法读取 1.txt 文件:', err)
    return
  }

  const words = data.split(/\r?\n/).filter((word) => word.trim() !== '')

  words.forEach((originalWord) => {
    let processedWord = originalWord.toLowerCase().replaceAll(/\s/g, '_')

    const wordFilePath = path.resolve(targetDir, `${processedWord}.md`)

    // 检查文件是否已存在
    fs.access(wordFilePath, fs.constants.F_OK, (err) => {
      if (!err) {
        // 文件已存在，跳过
        console.log(`文件已存在，跳过: ${processedWord}.md`)
        return
      }

      // 创建空的 markdown 文件
      fs.writeFile(wordFilePath, `- ${originalWord}`, (writeErr) => {
        if (writeErr) {
          // console.error(`创建文件失败: ${processedWord}.md`, writeErr)
        } else {
          console.log(`已创建文件: ${processedWord}.md`)
          targetFilePaths.push(wordFilePath)
        }
      })
    })
  })
  fs.writeFileSync(path.resolve(__dirname, '2.txt'), targetFilePaths.join('\n'))
})

#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import fse from 'fs-extra'


const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('MD CLI', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })
    )
  )
}


const askQuestions = () => {
  const questions = [
    {
      name: "PATH",
      type: "input",
      message: "What is the file path(Default posts)?"
    },
    {
      name: "FILENAME",
      type: "input",
      message: "What is the name of the file?"
    },
    {
      name: "TITLE",
      type: "input",
      message: "What is the title of the file(Default fileName)?"
    },
    {
      name: "TAGS",
      type: "checkbox",
      message: "Choose your tags?",
      choices: [
        "Spring", "Java", "JavaScript", "Vue", "React", "杂谈", "SpringCloud",
        "SpringBoot"
      ],
      pageSize: 5
    },
    {
      name: "CATEGORY",
      type: "input",
      message: "What is the category of the file?"
    },
    // {
    //   name: "DATE",
    //   type: "date",
    //   message: "What is the file birthday?",
    //   prefix: " 🌎 ",
    //   default: date,
    //   filter: (d) => Math.floor(d.getTime() / 1000),
    //   validate: (t) => t * 1000 > Date.now() + 86400000 || "God I hope not!",
    //   locale: "zh-cn",
    //   format: { month: "short", hour: undefined, minute: undefined },
    //   clearable: true,
    // },
  ];
  return inquirer.prompt(questions)
};

const markdownTemplate = (filename, title, tags, category) => {

  let tagYaml = ''
  const getTags = (tags) => {
    tags.forEach(tag => {
      tagYaml += `    - ${tag}\r\n`
    })
    return tagYaml
  }

return `---
  author: '花裤衩'
  title: ${title || filename}
  tags:
${getTags(tags)}
  date: ${dayjs().format('YYYY-MM-DD HH:mm:ss') }
  categories: ${category}
---
  `
}


const createFile = (rootPath, filename, title, tags, category) => {
  if (!filename || !category || !tags || tags.length ===0) {
    console.log(
      chalk.red('Please enter the file name、tag and category of the file')
    )
    return
  }
  const mkPath = path.join(process.cwd(), 'pages', rootPath || 'posts' )
  if (!fs.existsSync(mkPath)) {
    fse.mkdirpSync(mkPath)
  }
  const fileName = path.join(mkPath, `${filename}.md`)
  fs.writeFileSync(fileName, markdownTemplate(filename, title, tags, category))
  return fileName
}

const success = (filepath) => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  )
}


const run = async () => {
  init();
  const answers = await askQuestions()
  const { PATH, FILENAME, TITLE, TAGS, CATEGORY } = answers
  const filePath = createFile(PATH, FILENAME, TITLE, TAGS, CATEGORY)
  success(filePath)
}
run()

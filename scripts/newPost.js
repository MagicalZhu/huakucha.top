#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'
import fse from 'fs-extra'

import { tags } from './data.js'


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
      choices: tags,
      pageSize: 5
    },
    {
      name: "CATEGORY",
      type: "input",
      message: "What is the category of the file?"
    },
    {
      name: 'FORWARD',
      type: 'confirm',
      message: 'Whether reprinted from others?',
    },
    {
      name: 'LOCK',
      type: 'confirm',
      message: 'Is it a private article?',
    },
    {
      name: 'FAV',
      type: 'confirm',
      message: 'Is it a favorite article?',
    }
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

const markdownTemplate = (filename, title, tags, category, forward, lock, fav) => {

  let tagYaml = ''
  const getTags = (tags) => {
    tags.forEach((tag, index) => {
      tagYaml += `    - ${tag}`
      if (index < tags.length - 1) {
        tagYaml +='\r\n'
      }
    })
    return tagYaml
  }

return `---
  author: 'ant'
  title: ${title || filename}
  tags:
${getTags(tags)}
  date: ${dayjs().format('YYYY-MM-DD HH:mm:ss') }
  categories: ${category}
  forward: ${forward || false}
  lock: ${lock || false}
  fav: ${fav || false}
---
  `
}


const createFile = (rootPath, filename, title, tags, category, forward, lock, fav) => {
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
  fs.writeFileSync(fileName, markdownTemplate(filename, title, tags, category, forward, lock, fav))
  return fileName
}

const success = (filepath) => {
  console.log(
    chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
  )
}


const run = async () => {
  try {
    init();
    const answers = await askQuestions()
    const { PATH, FILENAME, TITLE, TAGS, CATEGORY, FORWARD, LOCK, FAV } = answers
    const filePath = createFile(PATH, FILENAME, TITLE, TAGS, CATEGORY, FORWARD, LOCK, FAV)
    success(filePath)
  } catch (error) {
    console.log(
      chalk.red.bgBlackBright.bold(`Process Stopped~`)
    )
  }
}
run()


type colorType = 'techLang'

const colorMap: {[propsName:string]:string[]} = {
  blue: ['Java', 'Python'],
  green: ['Cloud'],
  yellow: ['JS'],
  red: ['Middleware'],
  gray: ['C#'],
  indigo: ['Go'],
  purple: ['Rust']
}


export function getColor(key:string,queryType: colorType):string{
  Object.keys(colorMap).forEach((key) => {
    const values = colorMap[key]
    if (values.includes(key)) {
      return key
    }
  })
  return 'gray'
}
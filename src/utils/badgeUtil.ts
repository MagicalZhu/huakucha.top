
type colorType = 'techLang'

const colorMap: {[propsName:string]:string[]} = {
  blue: ['Java', 'Python'],
  green: ['Cloud'],
  yellow: ['Js'],
  red: ['Middleware'],
  gray: ['C#'],
  indigo: ['Go'],
  purple: [],
  orange: ['Swift','Rust'],
  lime: ['Tech', 'Share'],
  amber: [],
  emerald: [],
  teal: [],
  fuchsia: [],
}


export function getColor(queryKey:string,queryType: colorType):string{
  const colorKeys = Object.keys(colorMap)
  for (let index = 0; index < colorKeys.length; index++) {
    const colorKey = colorKeys[index]
    const colorValues = colorMap[colorKey]
    if (colorValues.includes(queryKey)) {
      return colorKey
    }
  }
  return 'gray'
}
import { isArr } from '.'

export const readPath = (dirs: any[], preRes = [] as any[]) => {
  const res = preRes
  dirs.forEach(item => {
    if (isArr(item) && item.every(it => typeof it === 'string')) {
      res.push(item.join('/'))
    } else if (typeof item === 'string'){
      res.push(item)
    } else if (isArr(item) && item.some(it => isArr(it))) {
      readPath(item, res)
    }
  })
  return res
}
import delay from '../utils/delay'
interface Org {
  id: string
  name: string
}
const getOrgData = (): Org[] => {
  return Array(1)
    .fill(0)
    .map(() => {
      return {
       title: "厦门嗨行旅游",
      children: [{
        title: "技術部",
        id:1
      },{
        title: "未分配部門",
        id:2
      }]
      }
    })
}

const query = (parentId: string = '0') => {
  return delay(getOrgData())
}

const orgApi = {
  query,
}

export default orgApi

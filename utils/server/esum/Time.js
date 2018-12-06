/*
* date_type（
  1：30分钟
  2: 1小时
  3：3小时
  4：12小时
  5：1天
  6：3天
  7：7天
  8：1个月
  9：3个月
  10：6个月
  11：1年
 ）
* */

const Time = {
  1: {
    num: 30,
    type: 'm',
    name: '30分钟'
  },
  2: {
    num: 1,
    type: 'h',
    name: '1小时'
  },
  3: {
    num: 3,
    type: 'h',
    name: '3小时'
  },
  4: {
    num: 12,
    type: 'h',
    name: '12小时'
  },
  5: {
    num: 1,
    type: 'd',
    name: '1天'
  },
  6: {
    num: 3,
    type: 'd',
    name: '3天'
  },
  7: {
    num: 7,
    type: 'd',
    name: '7天'
  },
  8: {
    num: 1,
    type: 'M',
    name: '1个月'
  },
  9: {
    num: 3,
    type: 'M',
    name: '3个月'
  },
  10: {
    num: 6,
    type: 'M',
    name: '6个月'
  },
  11: {
    num: 1,
    type: 'y',
    name: '1年'
  }
}

export default Time

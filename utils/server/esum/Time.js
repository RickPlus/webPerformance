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
    type: 'm'
  },
  2: {
    num: 1,
    type: 'h'
  },
  3: {
    num: 3,
    type: 'h'
  },
  4: {
    num: 12,
    type: 'h'
  },
  5: {
    num: 1,
    type: 'd'
  },
  6: {
    num: 3,
    type: 'd'
  },
  7: {
    num: 7,
    type: 'd'
  },
  8: {
    num: 1,
    type: 'M'
  },
  9: {
    num: 3,
    type: 'M'
  },
  10: {
    num: 6,
    type: 'M'
  },
  11: {
    num: 1,
    type: 'y'
  }
}

export default Time

import Time from '@/utils/server/esum/Time'
import Moment from 'moment'
const format = 'YYYY-MM-DD HH:mm:ss'

const dateTime = {
  transferTypeToTime: function (key = 1) {
    return Moment().subtract(Time[key].num, Time[key].type).format(format)
  },
  now: function () {
    return Moment().format(format)
  }
}

export default dateTime

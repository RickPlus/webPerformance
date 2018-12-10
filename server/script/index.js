import schedule from 'node-schedule'
import Average from './average'

schedule.scheduleJob('*/30 * * * *', async function () {
  await Average.start()
})

schedule.scheduleJob('0 0 11 * * *', async function () {
  await Average.delete()
})

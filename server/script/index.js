import schedule from 'node-schedule'
import Average from './average'

schedule.scheduleJob('*/30 * * * *', async function () {
  await Average.start()
})

schedule.scheduleJob('*/50 * * * *', async function () {
  await Average.delete()
})

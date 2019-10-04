jest.mock('../cronJob')

import { CronJob } from '../cronJob'

describe('cron:', () => {
  describe('index.ts:', () => {
    it('should instantiate CronJob and call launchScraper method', () => {
      require('../index')
      expect(CronJob).toHaveBeenCalledTimes(1)
    })
  })
})

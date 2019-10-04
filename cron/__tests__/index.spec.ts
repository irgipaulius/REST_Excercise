jest.mock('../cronJob')

import { CronJob } from '../cronJob'
import CronJobMock from '../__mocks__/cronJobMock'

function mockCronJob(cj: any) {
  cj = CronJobMock
}

describe('cron:', () => {
  describe('index.ts:', () => {
    it('should instantiate CronJob and call launchScraper method', () => {
      mockCronJob(CronJob)
      require('../index')
      expect(CronJob).toHaveBeenCalledTimes(1)
    })
  })
})

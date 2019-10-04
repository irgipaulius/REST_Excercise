import { Page } from '../../types'

class CronJobMock {
  page: number
  pageInfo: Page

  launchScraper = jest.fn()
  updatePageInfo = jest.fn()
  updateUsersList = jest.fn()
}

export default CronJobMock

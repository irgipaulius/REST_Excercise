import cron from 'node-cron'
import { getPagesInfo, savePage } from './cronService'
import { Page } from '../types'

export class CronJob {
  page: number
  pageInfo: Page
  constructor() {
    this.page = 1
    getPagesInfo().then(page => {
      this.pageInfo = page
    })
  }

  launchScraper(cronExpression: string) {
    cron.schedule(cronExpression, async () => {
      console.log('updating page ' + this.page)
      this.updateUsersList()
    })
  }

  private async updateUsersList() {
    if (this.page <= this.pageInfo.total_pages) {
      await savePage(this.page)
      this.page++
    } else {
      this.page = 1
    }
  }
}

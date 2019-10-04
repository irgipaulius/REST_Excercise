import cron from 'node-cron'
import { getPagesInfo, savePage } from './cronService'
import { Page } from '../types'

export class CronJob {
  page: number
  pageInfo: Page
  constructor() {
    this.page = 1
  }

  launchScraper(cronExpression: string) {
    cron.schedule(cronExpression, async () => {
      console.log('updating page ' + this.page)
      this.updatePageInfo()
      this.updateUsersList()
    })
  }

  async updatePageInfo() {
    this.pageInfo = await getPagesInfo()
    console.log('total_pages: ' + this.pageInfo && this.pageInfo.total_pages)
  }

  async updateUsersList() {
    await savePage(this.page)
    this.page++
    if (this.page > this.pageInfo.total_pages) {
      this.page = 1
    }
  }
}

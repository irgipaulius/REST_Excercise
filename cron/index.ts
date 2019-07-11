import { CronJob } from './cronJob'
const Cron = new CronJob()
Cron.launchScraper('* * * * *')

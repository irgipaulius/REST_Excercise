jest.mock('node-cron')
jest.mock('../cronService')

import cron from 'node-cron'
import { CronJob } from '../cronJob'
import { getPagesInfo, savePage } from '../cronService'

import cronMock from '../__mocks__/node-cronMock'
import { Page } from '../../types'

function mockFunction(fn: any, result: any) {
  fn.mockImplementation(() => result)
}
function mockPromiseFunction(fn: any, response: any) {
  fn.mockImplementation(() => {
    return new Promise((res, rej) => {
      res(response)
    })
  })
}
function mockCron(fn: any) {
  fn = cronMock
}

var cronInstance: CronJob

beforeEach(() => {
  mockCron(cron)
  cronInstance = new CronJob()
  mockPromiseFunction(getPagesInfo, examplePage)
  mockPromiseFunction(savePage, undefined)
})

describe('cron:', () => {
  describe('cronJob:', () => {
    describe('constructor:', () => {
      it('should set default parameters upon instantiating', () => {
        expect(cronInstance.page).toEqual(1)
      })
    })

    describe('launchScraper():', () => {
      it('should start cron.schedule and update pageInfo and UsersList', async done => {
        cronInstance.launchScraper('testExpression')
        expect(cron.schedule).toBeCalledTimes(1)
        expect(cron.schedule).toBeCalledWith('testExpression', expect.any(Function))
        done()
      })
    })

    describe('updatePageInfo():', () => {
      it('should update pageInfo', async done => {
        await cronInstance.updatePageInfo()
        expect(getPagesInfo).toBeCalledTimes(1)
        expect(cronInstance.pageInfo).toEqual(examplePage)
        done()
      })
    })

    describe('updateUserList():', () => {
      it('should save page and increase current page number', async done => {
        cronInstance.page = 1
        cronInstance.pageInfo = examplePage
        await cronInstance.updateUsersList()
        expect(savePage).toBeCalledWith(1)
        expect(cronInstance.page).toEqual(2)
        expect(cronInstance.pageInfo).toEqual(examplePage)
        done()
      })
    })
  })
})

const examplePage: Page = {
  total_pages: 10,
  total: 60,
  per_page: 6,
  page: 0,
  data: [],
}

class NodeCronMock {
  scheduleCallback: Function
  schedule = jest.fn((cronExpression: string, triggerCallback: Function) => {
    this.scheduleCallback = triggerCallback
  })
}

export default NodeCronMock

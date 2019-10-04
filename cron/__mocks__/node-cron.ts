const NodeCronMock = {
  schedule: jest.fn((cronExpression: string, triggerCallback: Function) => {
    triggerCallback()
  }),
}

export default NodeCronMock

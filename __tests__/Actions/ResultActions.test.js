import ResultActions from '../../src/Components/Result/ResultActions'

describe('ResultActions functionality', () => {
  it('should create an action with correct type', () => {
    expect(ResultActions.setDay().type).toEqual('HANDLE_DAY_PICKED')
  })
})

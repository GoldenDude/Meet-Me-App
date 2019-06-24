import HomePageActions from '../../src/Components/HomePage/HomePageActions'

describe('HomePageActions functionality', () => {
  it('should create an action with correct type', () => {
    expect(HomePageActions.setAuth().type).toEqual('AUTH')
    expect(HomePageActions.setGranted().type).toEqual('SET_GRANTED')
    expect(HomePageActions.addPhoneNum().type).toEqual('ADD_PHONE_NUM')
  })
})

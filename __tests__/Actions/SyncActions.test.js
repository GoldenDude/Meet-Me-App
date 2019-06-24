import SyncActions from '../../src/Components/Sync/SyncActions'

describe('SyncActios functionality', () => {
  it('should create an action with correct type', () => {
    expect(SyncActions.addEvents().type).toEqual('ADD_EVENTS')
    expect(SyncActions.setSuccess().type).toEqual('HANDLE_SYNC_SUCCESS')
    expect(SyncActions.setLoading().type).toEqual('HANDLE_SYNC_LOADING')
    expect(SyncActions.SetVisiable().type).toEqual('HANDLE_SYNC_VISIBLE')
    expect(SyncActions.setMissingPhone().type).toEqual('HANDLE_SYNC_MISSING_PHONE')
  })
})

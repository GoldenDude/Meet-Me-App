import FormActions from '../../src/Components/Form/FormActions'

describe('FormActions functionality', () => {
  it('should create an action with correct type', () => {
    expect(FormActions.setContact().type).toEqual('HANDLE_CONTACT')
    expect(FormActions.setVisible().type).toEqual('HANDLE_VISIBLE')
    expect(FormActions.setLoading().type).toEqual('HANDLE_LOADING')
    expect(FormActions.setSuccess().type).toEqual('HANDLE_SUCCESS')
    expect(FormActions.setMinHour().type).toEqual('HANDLE_MIN_HOUR')
    expect(FormActions.setMaxHour().type).toEqual('HANDLE_MAX_HOUR')
    expect(FormActions.setDuration().type).toEqual('HANDLE_DURATION')
    expect(FormActions.setFreeTime().type).toEqual('HANDLE_FREE_TIME')
    expect(FormActions.setStartDate().type).toEqual('HANDLE_START_DATE')
    expect(FormActions.setMissingContact().type).toEqual('HANDLE_IS_MISSING')
    expect(FormActions.setMissingPhone().type).toEqual('HANDLE_PHONE_MISSING')
  })
})

@Controller({
  command: 'account [budgetId]',
  options: [
    ['-l, --list', 'list account balances'],
    ['-m', '--email <address>', 'send account balances to the email address']
  ]
})
export class AccountController {
  constructor({ accountService, emailService, configService }) {
    this.accountService = accountService
    this.emailService = emailService
    this.configService = configService
  }

  takeArg(budgetId) {
    this.budgetId = budgetId || this.configService.activeBudgetId
  }

  @Action({
    forOptions: options => options.list,
    view: AccountsView
  })
  list () {
    return this.getAccounts()
  }

  @Action({
    forOptions: options => options.email,
    view: ResultView
  })
  sendEmail ({ email }) {
    const accounts = this.getAccounts()
    return this.emailService.sendAccounts(accounts, email)
  }

  getAccounts () {
    return this.accountService.getAll(this.budgetId)
  }
}
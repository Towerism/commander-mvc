import { ForOptions, ActionInfo, DEFAULT_ACTION_INFO } from '../interfaces/action-info.interface'
import { getController } from '../controller-table'
import { constructorToToken } from '../constructor-to-token'
import { Constructor } from 'awilix'
import { View } from '../interfaces/view.interface'

/**
 * Creates an `Action` decorator.
 * @param action `Action` information that specifies the view and which
 * options this `Action` will handle.
 * @returns The decorator used to designate a method an action.
 */
export function Action (action: ActionInfo = DEFAULT_ACTION_INFO) {
  return (target, methodName: string) => {
    const token = constructorToToken(target.constructor)
    addActionsForOptions(token, action.forOptions, methodName)
    if (action.view) {
      addView(token, action.view, methodName)
    }
  }
}

function addActionsForOptions (token: string, forOptions: ForOptions, methodName: string) {
  const { actionsForOptions } = getController(token)
  actionsForOptions.push({ forOptions, methodName })
}

function addView (token: string, view: Constructor<View>, methodName: string) {
  const { actionViews } = getController(token)
  actionViews[methodName] = view
}

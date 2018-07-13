import { EntityState, EntitySelectors } from './models'

export function createSelectorsFactory<T>() {
  function getSelectors(): EntitySelectors<T, any> {
    const selectIds = (state: any) => state.ids
    const selectEntities = (state: EntityState<T>) => state.entities
    const selectAll = (state: EntityState<T>): any =>
      selectIds(state).map((id: any) => (selectEntities(state) as any)[id])

    const selectTotal = (state: EntityState<T>) => selectIds(state).length

    return {
      selectIds,
      selectEntities,
      selectAll,
      selectTotal
    }
  }

  return { getSelectors }
}

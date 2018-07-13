import { createEntityAdapter, EntityAdapter, EntityState } from '../src/ngxs-entity'
import { EntitySelectors } from '../src/models'
import { BookModel, AClockworkOrange, AnimalFarm, TheGreatGatsby } from './fixtures/book'

describe('Entity State Selectors', () => {
  describe('Uncomposed Selectors', () => {
    type State = EntityState<BookModel>

    let adapter: EntityAdapter<BookModel>
    let selectors: EntitySelectors<BookModel, EntityState<BookModel>>
    let state: State

    beforeEach(() => {
      adapter = createEntityAdapter({
        selectId: (book: BookModel) => book.id
      })

      state = adapter.addAll(
        [AClockworkOrange, AnimalFarm, TheGreatGatsby],
        adapter.getInitialState()
      )

      selectors = adapter.getSelectors()
    })

    it('should create a selector for selecting the ids', () => {
      const ids = selectors.selectIds(state)

      expect(ids).toEqual(state.ids)
    })

    it('should create a selector for selecting the entities', () => {
      const entities = selectors.selectEntities(state)

      expect(entities).toEqual(state.entities)
    })

    it('should create a selector for selecting the list of models', () => {
      const models = selectors.selectAll(state)

      expect(models).toEqual([AClockworkOrange, AnimalFarm, TheGreatGatsby])
    })

    it('should create a selector for selecting the count of models', () => {
      const total = selectors.selectTotal(state)

      expect(total).toEqual(3)
    })
  })
})

export const state = () => ({
    pickup_status: null,
    destination_status: null,
    pickup: null,
    destination: null
})

export const getters = {
    getPickupStatus(state) {
        return state.pickup_status
    },
    getDestinationStatus(state) {
        return state.destination_status
    },
    getPickup(state) {
        return state.pickup
    },
    getDestination(state) {
        return state.destination
    }
}

export const mutations = {
    storePickup(state, payload) {
        state.pickup_status = payload.status
        state.pickup = payload.pickup
    },
    storeDestination(state, payload) {
        state.destination_status = payload.status
        state.destination = payload.destination

    },
    clearAll(state) {
        state.pickup_status = null
        state.destination_status = null
        state.pickup = null
        state.destination = null

    }
}

export const actions = {
    setPickup({ commit }, payload) {
        commit('storePickup', payload
        )
    },
    setDestination({ commit }, payload) {
        commit('storeDestination', payload
        )
    }
}
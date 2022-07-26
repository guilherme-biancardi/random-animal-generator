import { defineStore } from "pinia";

export const useStore = defineStore('main', {
    state: () => ({
        animals: []
    }),
    getters: {
        getAnimal: state => index => state.animals[index],
        getAnimals: state => state.animals
    },
    actions: {
        setAnimal(animal) {
            this.animals.push(animal)
        }
    }
})
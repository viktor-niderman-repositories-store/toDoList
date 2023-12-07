import type { Ref } from 'vue';
import {ref, watch} from 'vue'
import {defineStore} from 'pinia'

interface Note {
    id: number;
    text: string;
    isCompleted: boolean;
    createdAt: Date;
}

let currentId = 0;
const storageKey = 'todoList';
const createNewNote = (text:string):Note => {
    return {
        id: currentId++,
        text,
        isCompleted: false,
        createdAt: new Date,
    }
}
export const useToDoStore = defineStore('todo', () => {
    const todoList: Ref<Note[]> = ref([])

    const saveToStorage = () => {
        localStorage[storageKey] = JSON.stringify({
            todoList: todoList.value,
            currentId
        })
    }

    const loadFromStorage = () => {
        if (localStorage[storageKey]) {
            const storage = JSON.parse(localStorage[storageKey])
            todoList.value = storage.todoList
            currentId = storage.currentId
        }
    }

    const addTodo = (text: string) => {
        todoList.value.unshift(createNewNote(text))
    }

    const markTodo = (id: number) => {
        const item = todoList.value.find((el: Note) => el.id === id)
        if(!item) return
        item.isCompleted = !item.isCompleted
    }

    const deleteTodo = (id: number) => {
        const i = todoList.value.findIndex((el: Note) => el.id === id)
        todoList.value.splice(i, 1)
    }

    const editTodo = (id: number, text: string) => {
        const item = todoList.value.find((el: Note) => el.id === id)
        if(!item) return
        item.text = text
    }

    loadFromStorage()
    watch(todoList, () => saveToStorage(),{ deep: true })
    return {todoList, addTodo, markTodo, deleteTodo, editTodo}
})

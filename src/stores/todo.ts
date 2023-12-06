import {ref} from 'vue'
import {defineStore} from 'pinia'

let count = 0;

class Note {
    id: number;
    note: string;
    isCompleted: boolean;
    createdAt: Date;

    constructor(text: string, storedObj:any = null) {
        if (storedObj) {
            this.id = storedObj.id
            this.note = storedObj.note
            this.isCompleted = storedObj.isCompleted
            this.createdAt = storedObj.createdAt
            return
        }
        this.id = count++
        this.note = text;
        this.isCompleted = false;
        this.createdAt = new Date()
    }

    changeMark() {
        this.isCompleted = !this.isCompleted
    }

    editNote(text: string) {
        this.note = text
    }
}

export const useToDoStore = defineStore('todo', () => {
    const todoList = ref([new Note('Hello World')])
    const storageKey = 'toDoList';
    const saveToStorage = () => {
        localStorage[storageKey] = JSON.stringify({
            todoList: todoList.value,
            count: count
        })
    }
    const loadFromStorage = () => {
        if (localStorage[storageKey]) {
            const storage = JSON.parse(localStorage[storageKey]);
            todoList.value = storage.todoList.map((el:object) => new Note('', el));
            count = storage.count
        }
    }

    loadFromStorage()


    function todoAdd(note: string) {
        todoList.value.unshift(new Note(note))
        saveToStorage()
    }

    function todoMark(id: number) {
        todoList.value.find((el: Note) => el.id === id)?.changeMark()
        saveToStorage()
    }

    function todoEdit(id: number, text: string) {
        todoList.value.find((el: Note) => el.id === id)?.editNote(text)
        saveToStorage()
    }

    function todoDelete(id: number) {
        const i = todoList.value.findIndex((el: Note) => el.id === id)
        todoList.value.splice(i, 1)
        saveToStorage()
    }

    // const doubleCount = computed(() => count.value * 2)
    return {todoList, todoAdd, todoMark, todoEdit, todoDelete}
})

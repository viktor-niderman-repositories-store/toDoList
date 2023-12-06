import { ref } from 'vue'
import { defineStore } from 'pinia'

let count = 0;

class Note {
  id: number;
  note: string;
  isCompleted: boolean;
  createdAt: Date;
  constructor(text:string) {
    this.id = count++
    this.note = text;
    this.isCompleted = false;
    this.createdAt = new Date()
  }
  changeMark() {
    this.isCompleted = !this.isCompleted
  }
  editNote(text:string) {
    this.note = text
  }
}

export const useToDoStore = defineStore('todo', () => {
  const todoList = ref([new Note('Hello World')])

  function todoAdd(note:string) {
    todoList.value.unshift(new Note(note))
  }
  function todoMark (id:number) {
    todoList.value.find((el:Note) => el.id === id)?.changeMark()
  }
  function todoEdit (id:number, text:string) {
    todoList.value.find((el:Note) => el.id === id)?.editNote(text)
  }
  function todoDelete(id:number) {
    const i = todoList.value.findIndex((el:Note) => el.id === id)
    todoList.value.splice(i, 1)
  }

  // const doubleCount = computed(() => count.value * 2)
  return { todoList, todoAdd, todoMark, todoEdit, todoDelete }
})

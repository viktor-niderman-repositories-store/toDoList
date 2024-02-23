<script setup lang="ts">
import {useToDoStore} from '@/stores/todo'
import type {Ref} from 'vue'
import {ref} from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconTrash from "@/components/icons/IconTrash.vue";
import IconEdit from "@/components/icons/IconEdit.vue";
import IconCopy from "@/components/icons/IconCopy.vue";


const store = useToDoStore()
const {todoList, addTodo, markTodo, deleteTodo, editTodo} = store
const editedId: Ref<null | number> = ref(null)
const editedText = ref('')

const noteInput = ref('');
const createNote = () => {
  noteInput.value = noteInput.value.trim();
  if (noteInput.value) {
    addTodo(noteInput.value);
    noteInput.value = '';
  }
}

const copyTodo = (text: string) => {
  navigator.clipboard.writeText(text);
}

const changeTodo = (id: number, text:string) => {
  editedId.value = id;
  editedText.value = text;
}

const doMarkTodo = (id: number) => {
  if (id === editedId.value) {
    return
  }
  markTodo(id)
}

const saveTodo = () => {
  if (editedId.value && editedText.value) {
    editTodo(editedId.value, editedText.value)
  }
  editedId.value = null
  editedText.value = ''
}
</script>

<template>
  <div class="todoList mx-auto mt-4 max-w-md px-3 text-gray-700">
    <div>
      <div class="text-center text-gray-500 mb-5 text-sm">
        ⚠️ Your data is stored in the Local Store, which means that it will only be available to you in the current
        browser
        for the current user.
      </div>
      <div class="flex">
        <input placeholder="Type your note..." type="text" v-model="noteInput" @keyup.enter="createNote"
               class="flex-grow rounded border-2 px-2 text-gray-500">
        <button @click="createNote"
                class="bg-neutral-700  hover:bg-neutral-500 text-white font-bold py-1 px-3 rounded ml-2">Create
        </button>
      </div>
      <ul class="mt-4" v-auto-animate>
        <li v-for="item in todoList"
            class="note flex bg-neutral-100 rounded-md cursor-pointer px-2 py-1 my-1"
            :class="{'bg-green-100': item.isCompleted}"
            :key="item.id"
        >
          <div class="icon success-icon" @click="doMarkTodo(item.id)">
            <span v-if="item.isCompleted">
              <IconCheck/>
            </span>
          </div>
          <div class="flex-grow break-all" @click="doMarkTodo(item.id)" :class="{'opacity-20': item.isCompleted}">
            <input type="text" v-model="editedText" v-if="editedId === item.id" @focusout="saveTodo" @change="saveTodo" class="w-full px-2 rounded">
            <span v-else :class="{deleted: item.isCompleted}">{{ item.text }}</span>
          </div>
          <div v-if="!item.isCompleted" @click="copyTodo(item.text)" class="icon trash-icon">
            <span>
              <IconCopy/>
            </span>
          </div>
          <div v-if="!item.isCompleted" @click="changeTodo(item.id, item.text)" class="icon trash-icon">
            <span>
              <IconEdit/>
            </span>
          </div>
          <div @click="deleteTodo(item.id)" class="icon trash-icon">
            <span>
              <IconTrash/>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

.icon {
  min-width: 24px;
  height: 24px;
  user-select: none;
  margin: 0 .1rem;
}

.deleted {
  text-decoration: line-through;
}

.note {
  outline: 1px solid #e7e7e7;
}

.note:hover {
  outline: 1px solid #c6dcc9;
}

.trash-icon:hover {
  color: #a93d3d;
}

.success-icon {
  color: green;
}

</style>

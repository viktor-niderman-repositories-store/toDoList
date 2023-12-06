<script setup lang="ts">
import {useToDoStore} from '@/stores/todo'
import {ref} from "vue";
import IconCheck from "@/components/icons/IconCheck.vue";
import IconTrash from "@/components/icons/IconTrash.vue";

const store = useToDoStore()
const {todoList, todoAdd, todoMark, todoEdit, todoDelete} = store

const noteInput = ref('');
const createNote = () => {
  noteInput.value = noteInput.value.trim();
  if (noteInput.value) {
    todoAdd(noteInput.value);
    noteInput.value = '';
  }
}
</script>

<template>
  <div class="todoList">
    <div>
      <div class="warning">
        ⚠️ Your data is stored in the Local Store, which means that it will only be available to you in the current browser
        for the current user.
      </div>
      <div class="d-flex">
        <input type="text" v-model="noteInput" @keyup.enter="createNote">
        <button @click="createNote" class="c-pointer">Create</button>
      </div>
      <ul>
        <li v-for="item in todoList" class="note c-pointer">
          <div class="noteCheckbox" @click="todoMark(item.id)">
            <span v-if="item.isCompleted">
              <IconCheck/>
            </span>
          </div>
          <div class="noteText" @click="todoMark(item.id)">
            <span :class="{deleted: item.isCompleted}">{{ item.note }}</span>
          </div>
          <div @click="todoDelete(item.id)" class="noteCheckbox">
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
.todoList {
  width: 500px;
  max-width: 100%;
  margin: 1rem auto 0;
}

.note {
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  margin: .5rem 0;
  background-color: #f3f3f3;
  border-radius: .3rem;
  padding: 0;
}

.noteCheckbox {
  width: 24px;
  height: 24px;
}

.deleted {
  text-decoration: line-through;
}

input, button {
  font-size: 1rem;
  border-radius: .3rem;
  border: .5px solid black;
}

button {
  padding: .3rem .5rem;
  margin-left: 1rem;
  background-color: #2a2929;
  color: white;
}

input {
  flex-grow: 1;
}

.noteText {
  flex-grow: 1;
}

.warning {
  margin-bottom: 1.5rem;
  color: #5d5d5d;
  text-align: center;
}
</style>

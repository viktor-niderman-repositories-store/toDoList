<script setup lang="ts">
import {useToDoStore} from '@/stores/todo'
import {ref} from "vue";

const store = useToDoStore()
const { todoList, todoAdd, todoMark, todoEdit, todoDelete } = store

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
    <input type="text"   v-model="noteInput" @keyup.enter="createNote">
    <button @click="createNote">Create</button>
    <ul>
      <li v-for="item in todoList" class="note">
        <div class="noteCheckbox" @click="todoMark(item.id)">
          <span v-if="item.isCompleted">✅</span>
        </div>
        <div>
          <span :class="{deleted: item.isCompleted}">{{item.note}}</span>
          <span @click="todoDelete(item.id)" class="trash">🗑️</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.todoList {
  margin: 10px;
}
.note {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin: .5rem 0;
}
.noteCheckbox {
  width: 26px;
  height: 32px;
  border: 1px solid black;
  margin: 0 .5rem;
}
.deleted {
  text-decoration: line-through;
}
.trash {
  padding-left: .5rem;
}
input, button {
  font-size: 1.5rem;
  margin-right: .5rem;
  max-width: 60%;
}
</style>

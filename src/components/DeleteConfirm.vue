<template>
    <v-dialog v-model="isOpen" max-width="600px" height="20vh">
      <v-card class="justify-space-between">
        <v-card-title>Deseja mesmo deletar o item?</v-card-title>
        <v-card-actions>
          <v-btn color="red" @click="deleteFuction">Deletar</v-btn>
          <v-btn text @click="fechar">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script setup>
  import { ref, defineExpose,defineProps } from 'vue'
  import {deleteItem} from '@/services/api'

  const props = defineProps({
  onSave: Function
})

  
  const isOpen = ref(false)
  const form = ref({ name: '', price: 0, description:'' })
  
  function abrir(item = { name: '', price: 0, description:''  }) {
    form.value = { ...item }
    isOpen.value = true
  }
  
  function fechar() {
    isOpen.value = false
  }
  
  async function deleteFuction() {
    await deleteItem(form.value.uid)
    props.onSave?.()
    fechar()
  }
  defineExpose({ abrir })
  </script>
  
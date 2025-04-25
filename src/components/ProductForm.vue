<template>
  <v-dialog v-model="isOpen" max-width="600px">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="formValid">
          <v-text-field
            label="Nome"
            v-model="form.name"
            :rules="[v => !!v || 'Nome é obrigatório']"
          />
          <v-text-field
            label="Preço"
            v-model="form.price"
            type="number"
            :rules="[
              v => !!v || 'Preço é obrigatório',
              v => v > 0 || 'Preço deve ser maior que zero'
            ]"
          />
          <v-text-field
            label="Descrição"
            v-model="form.description"
            :rules="[v => !!v || 'Descrição é obrigatória']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="salvar">Salvar</v-btn>
        <v-btn text @click="fechar">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script setup>
import { ref, defineExpose, defineProps } from 'vue'
import { updateItem, addItem } from '@/services/api'

const props = defineProps({
  onSave: Function
})

const isOpen = ref(false)
const formValid = ref(false)
const formRef = ref(null)
const form = ref({ name: '', price: 0, description: '' })
let createItem = ref(true)
let title = ref('Editar o item')

function abrir(item = { name: '', price: 0, description: '' }, create = true) {
  createItem.value = create
  title.value = create ? 'Adicionar o item' : 'Editar o item'
  form.value = { ...item }
  isOpen.value = true
}

function fechar() {
  isOpen.value = false
}

async function salvar() {
  const isValid = await formRef.value.validate()
  console.log(isValid.valid)
  if (!isValid.valid) return

  if (createItem.value) {
    await addItem(form.value)
  } else {
    await updateItem(form.value)
  }
  props.onSave?.()
  fechar()
}

defineExpose({ abrir })
</script>

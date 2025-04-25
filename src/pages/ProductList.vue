<template>
    <v-container fluid class="w-100" style="background-color: #eeeeee;min-height: 100vh;">
        <v-container>
            <v-row class="align-center justify-space-between">
                <v-col class="d-flex justify-center" cols="auto">
                    <v-img src="@/assets/mercadinho.png" width="150" height="150" />
                </v-col>

                <v-col class="d-flex justify-end" cols="auto">
                    <v-btn variant="outlined" color="green" @click="addButtom">Adicionar</v-btn>
                </v-col>
            </v-row>

            <v-container style="background-color: #f7f7f7;min-height: 80vh;box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
              0 10px 10px -5px rgba(0, 0, 0, 0.04);" align="center" justify="space-around" class="mt-4 rounded-lg">
                <v-table style="background-color: #f7f7f7;" class="border-md">
                    <thead>
                        <tr>
                            <th class="text-left font-weight-bold">
                                Nome
                            </th>
                            <th class="text-left font-weight-bold">
                                Preço
                            </th>
                            <th class="text-left font-weight-bold">
                                Descrição
                            </th>
                            <th class="text-left">
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in sortedProducts" :key="item.name"
                            style="word-wrap: break-word; white-space: normal; max-width: 10vw;">
                            <td style="word-wrap: break-word; white-space: normal; max-width: 10vw;">{{ item.name }}</td>
                            <td style="word-wrap: break-word; white-space: normal; max-width: 10vw;">R$ {{ item.price }}
                            </td>
                            <td style="word-wrap: break-word; white-space: normal; max-width: 40vw;">{{ item.description }}
                            </td>
                            <td>
                                <v-col class="ga-2 d-flex left-0 justify-end">
                                    <v-btn variant="outlined" class="text-right" color="#393e46"
                                        style="background-color: #f7f7f7;" @click="editButtom(index)">Editar</v-btn>

                                    <v-btn variant="outlined" class="text-right" color="red"
                                        @click="deleteButtom(index)">Apagar</v-btn>
                                </v-col>

                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-container>
        </v-container>

        <ProductForm ref="popupRef" :onSave="carregarProdutos" />
        <DeleteConfirm ref="deleteRef" :onSave="carregarProdutos" />
    </v-container>
</template>
  
<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { getAll } from '@/services/api'
import ProductForm from '@/components/ProductForm.vue'
import DeleteConfirm from '@/components/DeleteConfirm.vue'


const products = ref([])
const sortedProducts = ref([])
const popupRef = ref(null)
const deleteRef = ref(null)


async function carregarProdutos() {
    products.value = await getAll();
    const plainObject = toRaw(products.value);
    sortedProducts.value = plainObject.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt._seconds * 1000 + a.createdAt._nanoseconds / 1e6);
        const dateB = new Date(b.createdAt._seconds * 1000 + b.createdAt._nanoseconds / 1e6);
        return dateB - dateA; 
    });
}


function addButtom() {
    popupRef.value?.abrir()
}

function editButtom(index) {
    popupRef.value?.abrir(sortedProducts.value[index], false)
}

function deleteButtom(index) {
    deleteRef.value?.abrir(sortedProducts.value[index])
}

onMounted(async () => {
    await carregarProdutos()
})
</script>

  
  
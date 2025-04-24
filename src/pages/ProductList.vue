<template>
    <v-container>
        <v-btn color="primary" @click="openForm()">New Product</v-btn>

        <v-data-table :headers="headers" :items="products" class="mt-4">
            <template #item_actions="{ item }">
                <v-btn icon @click="editProduct(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="deleteProduct(item.id)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <product-form v-if="formOpen" :product="selectedProduct" @close="closeForm" @save="fetchProducts" />
    </v-container>
</template>
  
<script>
import api from '@/services/api'
import ProductForm from '@/components/ProductForm.vue'

export default {
    components: { ProductForm },
    data() {
        return {
            products: [],
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Price', value: 'price' },
                { text: 'Actions', value: 'item_actions', sortable: false },
            ],

            formOpen: false,
            selectedProduct: null,
        }
    },
    methods: {
        fetchProducts() {
            api.get('/products').then(res => {
                this.products = res.data
            })
        },
        openForm(product = null) {
            this.selectedProduct = product
            this.formOpen = true
        },
        closeForm() {
            this.formOpen = false
        },
        editProduct(product) {
            this.openForm(product)
        },
        deleteProduct(id) {
            api.delete(`/products/${id}`).then(this.fetchProducts)
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>
  
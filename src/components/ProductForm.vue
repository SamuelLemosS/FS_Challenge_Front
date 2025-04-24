<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>{{ productLocal.id ? 'Edit Product' : 'New Product' }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="productLocal.name" label="Name" />
          <v-text-field v-model="productLocal.price" label="Price" type="number" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  import api from '@/services/api'
  
  export default {
    props: ['product'],
    data() {
      return {
        dialog: true,
        productLocal: { ...this.product }
      }
    },
    watch: {
      product: {
        immediate: true,
        handler(newValue) {
          this.productLocal = { ...newValue }
        }
      }
    },
    methods: {
      save() {
        const method = this.productLocal.id ? 'put' : 'post'
        const url = this.productLocal.id
          ? `/products/${this.productLocal.id}`
          : '/products'
  
        api[method](url, this.productLocal).then(() => {
          this.$emit('save')
          this.$emit('close')
        })
      }
    }
  }
  </script>
  
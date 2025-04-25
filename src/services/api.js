import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4444/',
});


export const getAll = async () => {
  try {
    const response = await api.get('/product')
    return response.data
  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
}

export const addItem = async (item) => {
  try {
    const body = {
      name: item.name,
      price: parseFloat(item.price),
      description: item.description
    }

    const response = await api.post(`/produt/`, body)
    console.log('Item criado:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao adicionar dados:', error)
    throw error
  }
}

export const updateItem = async (item) => {
  try {
    const id = item.uid
    const body = {
      name: item.name,
      price: item.price,
      description: item.description
    }

    const response = await api.put(`/product/${id}`, body)
    console.log('Item atualizado:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao editar dados:', error)
    throw error
  }
}

export const deleteItem = async (id) => {
  try {
    const response = await api.delete(`/product/${id}`)
    console.log('Item deletado:', response.data)
    return response.data
  } catch (error) {
    console.error('Erro ao deletar dados:', error)
    throw error
  }
}

export default api;

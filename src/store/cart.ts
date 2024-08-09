import {defineStore} from 'pinia'
import {useProductStore} from './products'
import {CART_STORAGE} from '@/composables/usePersistCart'

export interface Purchase {
    productId: string
    quantity: number
}

interface CartState {
    contents: Record<string, Purchase>
}

export interface CartPreview {
    id: string
    image: string
    title: string
    quantity: number
    cost: number
    desc: string
}

export const useCartStore = defineStore({
    id: 'cart',

    state: (): CartState => ({
        contents: JSON.parse(localStorage.getItem(CART_STORAGE) as string) ?? {},
    }),

    getters: {
        count(): number {
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + this.contents[id].quantity
            }, 0)
        },

        total(): number {
            const products = useProductStore()
            return Object.keys(this.contents).reduce((acc, id) => {
                return acc + products.items[id].price * this.contents[id].quantity
            }, 0)
        },

        formattedCart(): CartPreview[] {
            const products = useProductStore()

            if (!products.loaded)
                return []

            return Object.keys(this.contents).map((productId) => {
                const purchase = this.contents[productId]

                return {
                    id: purchase.productId,
                    image: products.items[purchase.productId].images[0].path_name,
                    title: products.items[purchase.productId].title,
                    quantity: purchase.quantity,
                    desc: products.items[purchase.productId].description,
                    cost: purchase.quantity * products.items[purchase.productId].price,
                }
            })
        },

        cartContent(): { quantity: number; product_id: string }[] {
            return Object.keys(this.contents).map((productId) => {
                const purchase = this.contents[productId]

                return {
                    product_id: purchase.productId,
                    quantity: purchase.quantity,
                }
            })
        }
    },

    actions: {
        add(productId: string) {
            if (this.contents[productId]) {
                this.contents[productId].quantity += 1
            } else {
                this.contents[productId] = {
                    productId,
                    quantity: 1,
                }
            }
        },
        remove(productId: string) {
            if (!this.contents[productId])
                return

            this.contents[productId].quantity -= 1

            if (this.contents[productId].quantity === 0)
                delete this.contents[productId]
        },
        deleteAll() {
            this.contents = {}
            localStorage.removeItem(CART_STORAGE)
        }
    },
})

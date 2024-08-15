import Category from "@/types/category";
import {defineStore} from "pinia";
import {apiUrl, xApiKey} from "@/shared/utils";

interface CategoryState {
    items: Record<string, Category>
    ids: number[],
    selectedCategory: null|string,
}

export const useCategoryStore = defineStore({
    id: 'category',

    state: (): CategoryState => ({
        items: {},
        ids: [],
        selectedCategory: null,
    }),

    getters:{
        list(): Category[] {
            return this.ids.map(i => this.items[i])
        },
    },

    actions: {
        async fetchAll() {

            const res = await fetch(`${apiUrl}/api/v1/categories`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-KEY': xApiKey,
                }
            })

            const dataRes: any = await res.json()
            const data: Category[] = dataRes.data
            this.ids = data.map((category: any) => {
                this.items[category.id] = category
                return category.id
            })
        },

        setCategory(categoryId: string) {
            this.selectedCategory = categoryId;
        },

        all() {
            this.selectedCategory = null;
        },
    }
})

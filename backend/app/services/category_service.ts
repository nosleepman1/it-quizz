import Category from "#models/category"

export class CategoryService {

    async getAllCategories() {
        return Category.all()
    }

    async getCategoryById(id: number) {
        return Category.query().where('id', id).first();
    }

    async createCategory(data: Partial<Category>) {
        return Category.create(data)
    }

    async updateCategory(id: number, data: Partial<Category>) {
        const category = await Category.findOrFail(id)
        category.merge(data)
        await category.save()
        return category
    }

    async deleteCategory(id: number) {
        const category = await Category.findOrFail(id)
        await category.delete()
        return category
    }
}
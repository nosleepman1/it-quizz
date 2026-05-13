import SubCategory from "#models/sub_category"

export class SubCategoryService {

    async getAllSubCategories() {
        return SubCategory.all()
    }

    async getSubCategoryById(id: number) {
        return SubCategory.query().where('id', id).first()
    }

    async createSubCategory(data: Partial<SubCategory>) {
        return SubCategory.create(data)
    }

    async updateSubCategory(id: number, data: Partial<SubCategory>) {
        const subCategory = await SubCategory.findOrFail(id)
        subCategory.merge(data)
        await subCategory.save()
        return subCategory
    }

    async deleteSubCategory(id: number) {
        const subCategory = await SubCategory.findOrFail(id)
        await subCategory.delete()
        return subCategory
    }
}
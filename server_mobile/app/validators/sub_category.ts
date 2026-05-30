import vine from '@vinejs/vine'

const CreateSubCategoryValidator = vine.create({
    name: vine.string().minLength(3).maxLength(50),
    slug: vine.string().minLength(3).maxLength(50).optional(),
    description: vine.string().optional(),
    categoryId: vine.number().optional(),
})

const UpdateSubCategoryValidator = vine.create({
    name: vine.string().minLength(3).maxLength(50).optional(),
    slug: vine.string().minLength(3).maxLength(50).optional(),
    description: vine.string().optional(),
    categoryId: vine.number().optional(),
})

const DeleteSubCategoryValidator = vine.create({
    id: vine.number(),
})

export default {
    create: CreateSubCategoryValidator,
    update: UpdateSubCategoryValidator,
    delete: DeleteSubCategoryValidator
}
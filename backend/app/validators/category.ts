import vine from '@vinejs/vine'

const CreateCategoryValidator = vine.create({
    name: vine.string().minLength(3).maxLength(50),
    slug: vine.string().minLength(3).maxLength(50).optional(),
    description: vine.string().optional(),
    themeId: vine.number().optional(),
})

const UpdateCategoryValidator = vine.create({
    name: vine.string().minLength(3).maxLength(50).optional(),
    slug: vine.string().minLength(3).maxLength(50).optional(),
    description: vine.string().optional(),
    themeId: vine.number().optional(),
})

const DeleteCategoryValidator = vine.create({
    id: vine.number(),
})

export default {
    create: CreateCategoryValidator,
    update: UpdateCategoryValidator,
    delete: DeleteCategoryValidator
}
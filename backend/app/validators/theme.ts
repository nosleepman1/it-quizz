import vine from '@vinejs/vine'


export const CreateThemeValidator = vine.create({
    name : vine.string().minLength(3).maxLength(50),
    slug : vine.string().minLength(3).maxLength(50).optional(),
    description : vine.string().optional(),
})

export const UpdateThemeValidator = vine.create({
    name : vine.string().minLength(3).maxLength(50).optional(),
    slug : vine.string().minLength(3).maxLength(50).optional(),
    description : vine.string().optional(),
})

export const DeleteThemeValidator = vine.create({
    id : vine.number()
})

export default {
    create : CreateThemeValidator,
    update : UpdateThemeValidator,
    delete : DeleteThemeValidator
}
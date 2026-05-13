import type { HttpContext } from "@adonisjs/core/http"
import { inject } from "@adonisjs/core"
import { ThemeService } from "#services/theme_service"
import { CreateThemeValidator, UpdateThemeValidator } from "#validators/theme"


@inject()
export default class ThemesController {

    constructor(private themeService: ThemeService) { }

    async index({ response }: HttpContext) {
        const themes = await this.themeService.getAllThemes()
        return response.ok(themes)
    }

    async show({ params, response }: HttpContext) {
        const theme = await this.themeService.getThemeById(params.id)
        return response.ok(theme)
    }

    async store({ request, response }: HttpContext) {
        const data = await request.validateUsing(CreateThemeValidator)
        const theme = await this.themeService.createTheme(data)
        return response.ok(theme)
    }

    async update({ params, request, response }: HttpContext) {
        const data = await request.validateUsing(UpdateThemeValidator)
        const theme = await this.themeService.updateTheme(params.id, data)
        return response.ok(theme)
    }

    async destroy({ params, response }: HttpContext) {
        const theme = await this.themeService.deleteTheme(params.id)
        return response.ok(theme)
    }
}
import Theme from "#models/theme"

export class ThemeService {
    async getAllThemes() {
        return Theme.all()
    }

    async getThemeById(id: number) {
        return Theme.query().where('id', id).first();
    }

    async createTheme(data: Partial<Theme>) {
        return Theme.create(data)
    }

    async updateTheme(id: number, data: Partial<Theme>) {
        const theme = await Theme.findOrFail(id)
        theme.merge(data)
        await theme.save()
        return theme
    }

    async deleteTheme(id: number) {
        const theme = await Theme.findOrFail(id)
        await theme.delete()
        return theme
    }
}
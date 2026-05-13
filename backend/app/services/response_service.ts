import Response from "#models/response"

export class ResponseService {

    async getAllResponses() {
        return Response.all()
    }

    async getResponseById(id: number) {
        return Response.query().where('id', id).first()
    }

    async createResponse(data: Partial<Response>) {
        return Response.create(data)
    }

    async updateResponse(id: number, data: Partial<Response>) {
        const response = await Response.findOrFail(id)
        response.merge(data)
        await response.save()
        return response
    }

    async deleteResponse(id: number) {
        const response = await Response.findOrFail(id)
        await response.delete()
        return response
    }
}
import Question from "#models/question"

export class QuestionService {

    async getAllQuestions() {
        return Question.all()
    }

    async getQuestionById(id: number) {
        return Question.query().where('id', id).first()
    }

    async createQuestion(data: Partial<Question>) {
        return Question.create(data)
    }

    async updateQuestion(id: number, data: Partial<Question>) {
        const question = await Question.findOrFail(id)
        question.merge(data)
        await question.save()
        return question
    }

    async deleteQuestion(id: number) {
        const question = await Question.findOrFail(id)
        await question.delete()
        return question
    }
}
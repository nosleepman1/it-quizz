import Topic from "#models/topic"

export class TopicService {

    async getAllTopics() {
        return Topic.all()
    }

    async getTopicById(id: number) {
        return Topic.query().where('id', id).first()
    }

    async createTopic(data: Partial<Topic>) {
        return Topic.create(data)
    }

    async updateTopic(id: number, data: Partial<Topic>) {
        const topic = await Topic.findOrFail(id)
        topic.merge(data)
        await topic.save()
        return topic
    }

    async deleteTopic(id: number) {
        const topic = await Topic.findOrFail(id)
        await topic.delete()
        return topic
    }
}
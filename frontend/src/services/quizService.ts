import API from "@/api/api";

export interface QuickPlayRequest {
  theme_id: number;
  number_of_questions?: number;
}

export interface CustomPlayRequest {
  theme_id?: number;
  category_id?: number;
  subcategory_id?: number;
  topic_id?: number;
  number_of_questions?: number;
}

export interface CompleteQuizRequest {
  reponses: Array<{
    question_id: number;
    choice_id: number;
  }>;
}

export const quizService = {
  /**
   * Option 1 : Quiz Rapide (Thème uniquement -> 20 questions par défaut)
   */
  async startQuickPlay(themeId: number, numberOfQuestions: number = 20) {
    const response = await API.post('/quizzes/quick-play', {
      theme_id: themeId,
      number_of_questions: numberOfQuestions,
    });
    return response.data;
  },

  /**
   * Option 2 : Quiz Personnalisé (Thème, Catégorie, Sous-catégorie, Topic)
   */
  async startCustomPlay(params: CustomPlayRequest) {
    const response = await API.post('/quizzes/custom-play', params);
    return response.data;
  },

  /**
   * Finaliser le Quiz et enregistrer le score
   */
  async completeQuiz(quizId: number, data: CompleteQuizRequest) {
    const response = await API.post(`/quizzes/${quizId}/complete`, data);
    return response.data;
  }
};

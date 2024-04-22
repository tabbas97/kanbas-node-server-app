import model from "./model.js";

export const createQuestion = async (question) => {
  return model.create(question);
};

export const findAllQuestions = async (quizId) => {
  return model.find({ quizId: quizId });
};

export const findQuestionById = async (questionId) => {
  return model.findById(questionId);
};

export const updateQuestion = async (questionId, question) => {
    return model.updateOne({ _id: questionId }, { $set: question });
    };

export const deleteQuestion = async (questionId) => {
  return model.deleteOne({ _id: questionId });
}

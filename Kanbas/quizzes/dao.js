import model from "./model.js";

export const createQuiz = async (quiz) => {
  return model.create(quiz);
};

export const findAllQuizzes = async () => {
  return model.find();
};

export const findQuizById = async (quizId) => {
  return model.findById(quizId);
};

export const findQuizzesByCourse = async (courseId) => {
  return model.find({ courseId: courseId });
};

export const updateQuiz = async (quizId, quiz) => {
  return model.updateOne({ _id: quizId }, { $set: quiz });
};

export const deleteQuiz = async (quizId) => {
  return model.deleteOne({ _id: quizId });
};

import * as dao from './dao.js';

export default function QuestionRoutes(app) {
    const createQuestion = async (req, res) => {
        const quizId = req.params.qid;
        const question = req.body;
        dao.createQuestion(question)
            .then((question) => {
                res.json(question);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };
    const deleteQuestion = async (req, res) => {
        const questionId = req.params.questionId;
        dao.deleteQuestion(questionId)
            .then((status) => {
                res.json(status);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };
    const findQuestionById = async (req, res) => {
        const questionId = req.params.questionId;
        dao.findQuestionById(questionId)
            .then((question) => {
                res.json(question);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };
    const findAllQuizQuestions = async (req, res) => {
        console.log('Finding questions for quiz ' + req.params.qid);
        const quizId = req.params.qid;
        dao.findAllQuestions(quizId)
            .then((questions) => {
                res.json(questions);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };
    const updateQuestion = async (req, res) => {
        const questionId = req.params.questionId;
        const question = req.body;
        dao.updateQuestion(questionId, question)
            .then((status) => {
                res.json(status);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };
    app.post('/api/questions', createQuestion);
    app.put('/api/questions/:questionId', updateQuestion);
    app.delete('/api/questions/:questionId', deleteQuestion);
    app.get('/api/questions/:questionId', findQuestionById);
    app.get('/api/quizzes/:qid/questions', findAllQuizQuestions);
}
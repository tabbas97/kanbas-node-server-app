import * as dao from './dao.js';

export default function QuizRoutes(app) {
    const createQuiz = async (req, res) => {
        const quiz = req.body;
        dao.createQuiz(quiz)
            .then((quiz) => {
                res.json(quiz);
            });
    };

    const deleteQuiz = async (req, res) => {
        const quizId = req.params.quizId;
        dao.deleteQuiz(quizId)
            .then((status) => {
                res.json(status);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };

    const findQuizById = async (req, res) => {
        const quizId = req.params.quizId;
        dao.findQuizById(quizId)
            .then((quiz) => {
                res.json(quiz);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };

    const findAllQuizzes = async (req, res) => {
        dao.findAllQuizzes()
            .then((quizzes) => {
                res.json(quizzes);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };

    const findQuizzesByCourse = async (req, res) => {
        const courseId = req.params.cid;
        console.log('Finding quizzes for course ' + courseId);
        dao.findQuizzesByCourse(courseId)
            .then((quizzes) => {
                res.json(quizzes);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };

    const updateQuiz = async (req, res) => {
        const quizId = req.params.quizId;
        const quiz = req.body;
        dao.updateQuiz(quizId, quiz)
            .then((status) => {
                res.status(status).json(quiz);
            }).catch((err) => {
                res.status(500).send(err);
            });
    };

    app.post('/api/quizzes', createQuiz);
    app.delete('/api/quizzes/:quizId', deleteQuiz);
    app.get('/api/quizzes/:quizId', findQuizById);
    app.get('/api/quizzes', findAllQuizzes);
    app.get('/api/courses/:cid/quizzes', findQuizzesByCourse);
    app.put('/api/quizzes/:quizId', updateQuiz);
};
const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
    try {
        console.log("entered..")
        const newQuestion = new Question(req.body);
        const savedQuestion = await newQuestion.save();
        console.log(savedQuestion)
        res.json(savedQuestion);
    } catch (error) {
        res.json({ message: "Could not create question", error: error.message });
    }
};

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error getting the questions", error: error.message });
    }
};

exports.getQuestionById = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error finding the question", error: error.message });
    }
};

exports.updateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: "Error updating the question", error: error.message });
    }
};

exports.partialUpdateQuestion = async (req, res) => {
    try {
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json(updatedQuestion);
    } catch (error) {
        res.status(400).json({ message: "Error updating the question", error: error.message });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: "Error deleting the question", error: error.message });
    }
};

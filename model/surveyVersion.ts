import mongoose from 'mongoose';

// Option Sub-schema
const OptionSchema = new mongoose.Schema({
    value: { type: String, required: true }, 
    label: { type: String, required: true }  
}, { _id: false });

// Question Sub-schema (질문 하나에 대한 정의)
const QuestionSchema = new mongoose.Schema({
    questionId: { type: String, required: true }, // 고유 식별자 (Q1, Q2...)
    order: { type: Number, required: true },      // 질문 순서
    text: { type: String, required: true },       // 질문 내용
    type: { 
        type: String, 
        enum: ['single', 'multi', 'slider'], 
        required: true 
    },
    options: { type: [OptionSchema], default: [] }
}, { _id: false });

// Main Schema (설문조사 버전 정의)
const SurveyVersionSchema = new mongoose.Schema({
    name: { type: String, default: '물회의 취향' },
    version: { type: Number, required: true, unique: true }, // 버전 번호
    createdAt: { type: Date, default: Date.now },
    questions: {
        type: [QuestionSchema],
        required: true
    }
});

const SurveyVersion = mongoose.models.SurveyVersion 
    || mongoose.model('SurveyVersion', SurveyVersionSchema, 'surveyVersion'); 

export default SurveyVersion;
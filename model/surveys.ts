import mongoose from 'mongoose';

// Answer Sub-schema (답변 항목 구조)
const AnswerSchema = new mongoose.Schema({
    questionId: { 
        type: String, 
        required: true,
        trim: true
    },
    response: { 
        type: [String], 
        default: [] 
    }
}, { _id: false }); 

// Main Schema (응답 전체 도큐먼트 구조)
const SurveysSchema = new mongoose.Schema({
    // 어떤 설문 버전이었는지 참조 (가장 중요)
    surveyVersionId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'SurveyVersion', 
        required: true,
        index: true 
    },
    timestamp: { 
        type: Date, 
        default: Date.now,
        index: true 
    },
    answers: {
        type: [AnswerSchema],
        required: true
    }
});

// ✅ 컬렉션 이름 강제 지정: 소문자 'surveys'
const Surveys = mongoose.models.Surveys 
    || mongoose.model('Surveys', SurveysSchema, 'surveys'); 

export default Surveys;
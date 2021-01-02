import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import QuestionStatistics from "./QuestionStatistics";
import QuestionForm from "./QuestionForm";

const Questionnaire = ({ questions, onUpdateQuizProgress, onEndQuiz }) => {
  const convertQuestionToReadableFormat = (question) => {
    let tempQuestion = {};
    for (const [key, value] of Object.entries(question)) {
      tempQuestion[key] = decodeURIComponent(value);
    }
    return tempQuestion;
  };

  const [quizProgress, setQuizProgess] = useState({
    total: 0,
    attempted: 0,
    correct: 0,
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    if (questions && !currentQuestion) {
      setCurrentQuestion(
        convertQuestionToReadableFormat(questions[currentQuestionIndex])
      );

      let qp = { ...quizProgress };
      qp.total = questions.length;
      setQuizProgess(qp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  useEffect(() => {
    setCurrentQuestion(
      convertQuestionToReadableFormat(questions[currentQuestionIndex])
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestionIndex]);

  useEffect(() => {
    onUpdateQuizProgress(quizProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizProgress]);

  const onSelectAnswer = (isAnswerCorrect) => {
    let qp = { ...quizProgress };
    qp.attempted += 1;
    if (isAnswerCorrect) qp.correct += 1;
    setQuizProgess(qp);
  };

  const onClickNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    else onEndQuiz();
  };

  return currentQuestion ? (
    <Container>
      <Row>
        <Col>
          <QuestionStatistics
            questionNo={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            question={currentQuestion}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          <QuestionForm
            question={currentQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
            onSelectAnswer={onSelectAnswer}
            onClickNextQuestion={onClickNextQuestion}
          />
        </Col>
      </Row>
    </Container>
  ) : (
    <Container>
      <Row>
        <Col>
          <h2>Loading....</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Questionnaire;

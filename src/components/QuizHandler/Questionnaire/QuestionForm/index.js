import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import OptionsList from "./OptionsList";

export default function QuestionForm({
  question: { question, correct_answer, incorrect_answers },
  isLastQuestion,
  onSelectAnswer,
  onClickNextQuestion,
}) {
  const options = [correct_answer, ...incorrect_answers.split(",")];
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const onClickOption = (e) => {
    const answer = e.target.name;
    setSelectedAnswer(answer);
    onSelectAnswer(answer === correct_answer);
  };

  const onClickNext = () => {
    setSelectedAnswer(null);
    onClickNextQuestion();
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>{question}</h3>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <OptionsList
            options={options}
            onClickOption={onClickOption}
            disabled={!!selectedAnswer}
          />
        </Col>
      </Row>
      <Container className={!selectedAnswer ? "d-none" : ""}>
        <Row className="text-center mt-5 mr-5">
          <Col>
            <h4>{selectedAnswer === correct_answer ? "Correct!" : "Sorry!"}</h4>
          </Col>
        </Row>
        <Row className="text-center mt-2 mr-5">
          <Col>
            <Button onClick={onClickNext}>
              {isLastQuestion ? "End Quiz" : "Next Question"}
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

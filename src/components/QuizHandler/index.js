import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";

import ProgressBar from "./ProgressBar";
import Questionnaire from "./Questionnaire";
import ScorePredictor from "./ScorePredictor";

const questions = require("../../questions.json");

const QuizHandler = () => {
  const [progress, setProgress] = useState({});
  const [quizEnded, setQuizEnded] = useState(false);

  const onUpdateQuizProgress = (prog) => {
    setProgress(prog);
  };

  const onEndQuiz = () => setQuizEnded(true);

  return (
    <Container fluid>
      {quizEnded ? (
        <Row>
          <Col>
            <Jumbotron fluid>
              <Container>
                <h1>Congratulations on completing the quiz!</h1>
                <p>
                  {`You have scored ${
                    (progress.correct / progress.total) * 100
                  }% marks!`}
                </p>
              </Container>
            </Jumbotron>
          </Col>
        </Row>
      ) : (
        <Container>
          <Row>
            <Col>
              <ProgressBar progress={progress} />
            </Col>
          </Row>
          <br />
          <Row>
            <Col className="col-md-2"></Col>
            <Col>
              <Questionnaire
                questions={questions}
                onUpdateQuizProgress={onUpdateQuizProgress}
                onEndQuiz={onEndQuiz}
              />
            </Col>
            <Col className="col-md-2"></Col>
          </Row>
          <Row>
            <Col>
              <ScorePredictor progress={progress} />
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default QuizHandler;

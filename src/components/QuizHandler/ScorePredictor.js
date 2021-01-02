import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import ProgressBar from "react-bootstrap/ProgressBar";

const QuizScorePredictor = ({ progress }) => {
  const [scorePredictions, setScorePredictions] = useState({
    lowest: 0,
    current: 0,
    highest: 100,
  });

  const getLowestPossibleScore = ({ correct, total }) =>
    parseInt((correct / total) * 100);
  const getCurrentScore = ({ attempted, correct }) =>
    parseInt((correct / attempted) * 100);
  const getHighestPossibleScore = ({ attempted, correct, total }) =>
    parseInt(((correct + (total - attempted)) / total) * 100);

  useEffect(() => {
    if (!progress || !progress.attempted) return;

    let lowest = getLowestPossibleScore(progress);
    let current = getCurrentScore(progress);
    let highest = getHighestPossibleScore(progress);
    let newScorePredictions = {
      lowest,
      current,
      highest,
    };
    setScorePredictions(newScorePredictions);
  }, [progress]);

  return (
    <Row className="stickyScoreIndicator">
      <Col>
        <Row>
          <Col>
            <p className="text-left">{`Score: ${scorePredictions.current}%`}</p>
          </Col>
          <Col>
            <p className="text-right">{`Max Score: ${scorePredictions.highest}%`}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <ProgressBar>
              <ProgressBar
                variant="info"
                now={scorePredictions.lowest}
                key={1}
              />
              <ProgressBar
                variant="warning"
                now={scorePredictions.current - scorePredictions.lowest}
                key={2}
              />
              <ProgressBar
                variant="success"
                now={
                  scorePredictions.highest === scorePredictions.current
                    ? 0
                    : scorePredictions.highest - scorePredictions.current
                }
                key={3}
              />
            </ProgressBar>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default QuizScorePredictor;

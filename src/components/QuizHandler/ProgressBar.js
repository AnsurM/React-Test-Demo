import ProgressBar from "react-bootstrap/ProgressBar";

const QuizProgressBar = ({ progress: { attempted, total } }) => {
  return <ProgressBar now={(attempted / total) * 100} />;
};

export default QuizProgressBar;

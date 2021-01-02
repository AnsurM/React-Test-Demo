import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function OptionsList({ options, onClickOption, disabled }) {
  return (
    <Row>
      {options.map((option) => (
        <Col className="col-md-6" key={option}>
          <Row>
            <Col className="col-md-1"></Col>
            <Col className="col-md-10">
              <Button
                className="optionButton my-3"
                name={option}
                variant="primary"
                onClick={onClickOption}
                disabled={disabled}
              >
                {option}
              </Button>
            </Col>
            <Col className="col-md-1"></Col>
          </Row>
        </Col>
      ))}
    </Row>
  );
}

import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

interface InstructionProps {}

const Instructions: React.FC<InstructionProps> = () => {
  const [modalShow, setModalShow] = useState(false);
  const InstructionsModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Setup & Rules
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Preperation of play</h4>
          <p>
            Create 6 stations with distances of 5, 6, 7, 8, 9 and 10 meters from
            the basket.
          </p>
          <p>Use 5 putters of your choice.</p>
          <h4>Setup of scorecard</h4>
          <p>
            Enter a player's Name and tap "Add Player" - Repeat for each player.
          </p>
          <p>Enter number of rounds to play and tap "Set Max Rounds"</p>
          <p>
            You can remove a player by tapping the red trashcan next to their
            name.
          </p>
          <p>You're ready to play - Tap "Start Game"</p>
          <h4>Playing and Scoring</h4>
          <p>
            Each player takes turn throwing all 5 of their discs from 10 meters,
            counting the number of successful throws and entering it on the
            scorecard.
          </p>
          <p>
            To enter a score for a player, tap their name and tap the number of
            successful throws. Next tap the checkmark button.
          </p>
          <p>
            The scorecard will show which distance each player should play from
            next turn. The distance is calculated: 5 meters + amount of
            successful throws = next turn distance
          </p>
          <p>
            Its possible to undo a score by selecting a player and tapping the
            undo button.
          </p>
          <h4>Points</h4>
          <p>
            Each successful throw from each distance award the player points
            equal to the distance they were at. Distance: 10 meters is 10
            points.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Row>
      <Col
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <FontAwesomeIcon
          color="black"
          icon={faCircleQuestion}
          onClick={() => setModalShow(true)}
        />
      </Col>
      <Col>
        <InstructionsModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Col>
    </Row>
  );
};

export default Instructions;

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
            <strong>Setup & Rules</strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h5 style={{ color: '#0d6efd', marginBottom: '1rem', fontWeight: '600' }}>
              🎯 Preparation of Play
            </h5>
            <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>
              Create <strong>6 stations</strong> with distances of <strong>5, 6, 7, 8, 9 and 10 meters</strong> from the basket.
            </p>
            <p style={{ lineHeight: '1.6' }}>
              Use <strong>5 putters</strong> of your choice.
            </p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h5 style={{ color: '#0d6efd', marginBottom: '1rem', fontWeight: '600' }}>
              📋 Setup of Scorecard
            </h5>
            <ol style={{ lineHeight: '1.8', paddingLeft: '1.5rem' }}>
              <li>Enter a player's name and tap <strong>"Add Player"</strong> - Repeat for each player</li>
              <li>Enter number of rounds to play and tap <strong>"Set Max Rounds"</strong></li>
              <li>Remove players by tapping the <span style={{ color: '#dc3545' }}>🗑️ red trashcan</span> next to their name</li>
              <li>When ready, tap <strong>"Start Game"</strong></li>
            </ol>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h5 style={{ color: '#0d6efd', marginBottom: '1rem', fontWeight: '600' }}>
              🎮 Playing and Scoring
            </h5>
            <p style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>
              Each player takes turn throwing all <strong>5 discs from 10 meters</strong>, counting successful throws.
            </p>
            <p style={{ marginBottom: '0.75rem', lineHeight: '1.6' }}>
              To enter a score: tap the player's name, select the number of successful throws, then tap the <span style={{ color: '#198754' }}>✓ checkmark button</span>.
            </p>
            <div style={{ 
              backgroundColor: 'var(--secondary-bg)', 
              padding: '1rem', 
              borderRadius: '8px',
              marginBottom: '0.75rem'
            }}>
              <p style={{ marginBottom: '0', lineHeight: '1.6', fontStyle: 'italic' }}>
                <strong>Distance Formula:</strong> Next distance = 5 meters + successful throws
              </p>
            </div>
            <p style={{ lineHeight: '1.6' }}>
              You can undo a score by selecting the player and tapping the <strong>↺ undo button</strong>.
            </p>
          </div>

          <div>
            <h5 style={{ color: '#0d6efd', marginBottom: '1rem', fontWeight: '600' }}>
              🏆 Points
            </h5>
            <p style={{ lineHeight: '1.6' }}>
              Each successful throw awards <strong>points equal to the distance</strong>.<br/>
              <em>Example: A successful throw from 10 meters = 10 points</em>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>Got it!</Button>
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
          icon={faCircleQuestion}
          onClick={() => setModalShow(true)}
          style={{ cursor: "pointer", color: "var(--text-color)" }}
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

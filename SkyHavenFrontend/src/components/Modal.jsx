import React from 'react';
import Modal from 'react-modal';
// import './Modal.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    margin: "0px",
    transform: 'translate(-50%, -50%)',
    width: "500px",
    padding : "0px",
    position: "absolute",
    zIndex : "1000",
  },
};

// Make sure to bind modal to your appElement
Modal.setAppElement('#root'); // Change to the actual root element ID of your app

export default function Example({content}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00'; // Change subtitle text color to red
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}
        style = {{
          backgroundColor : "#ff1c1c",
          color : "#FFFFFF",
          padding : "4px 8px 4px 8px",
          borderRadius : "5px",
          fontWeight : "450"
        }}
      >View</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} style = {{
          position: "absolute",
          right: "15px",
          marginTop: "15px",
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <div className='mt-7'>
          {content}
        </div>
      </Modal>
    </div>
  );
}

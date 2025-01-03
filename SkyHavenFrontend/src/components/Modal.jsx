import React from 'react';
import Modal from 'react-modal';
import './Modal.css';

// Make sure to bind modal to your appElement
Modal.setAppElement('#root'); // Change to the actual root element ID of your app

export default function Example({content, width}) {
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      margin: "0px",
      transform: 'translate(-50%, -50%)',
      width: width || "500px",
      padding : "0px",
      position: "absolute",
      zIndex : "1000",
      height: "80%",
    },
  };

  return (
    <div>
      <button onClick={openModal}
        style = {{
          border : "2px solid #E2E2E2",
        }}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-white"
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

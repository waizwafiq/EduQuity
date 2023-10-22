import React from "react";
import { Button } from "react-bootstrap";

function UpdateModal({ open, onClose, children }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-xl shadow p-6 transition-all flex justify-center items-center ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
        style={{ width: "600px", height: "400px", margin: "50px" }}
      >
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600 text-4xl"
        >
          x
        </Button>
        {children}
      </div>
    </div>
  );
}

export default UpdateModal;

import React from "react";
import { useColorContext } from "../context/ColorContextProvider";
import { useState } from "react";
import { RequestModal} from "../components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ClickableCard2({ children, className }) {
  const colors = useColorContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <div
        onClick={() => setShow(true)}
        className={`rounded-2xl bg-white ${className}`}
      >
        {children}
      </div>

      <RequestModal open={show} onClose={() => setShow(false)}>
        <Form
          className="flex flex-col justify-center items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Control
              className="w-full text-2xl border-4 border-[#686E7B] py-4 px-8 rounded-xl"
              type="number"
              placeholder="Request Amount"
            />
          </Form.Group>
{/* 
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              className="w-full text-2xl border-4 border-[#686E7B] py-4 px-8 rounded-xl"
              type="number"
              placeholder="Required Resources"
            />
          </Form.Group> */}
          <Button
            variant="primary"
            type="submit"
            className="mt-2 text-2xl font-semibold bg-[#6259CA] rounded-xl py-2 px-6 text-white"
          >
            Send
          </Button>
        </Form>
      </RequestModal>
    </>
  );
}

export default ClickableCard2;

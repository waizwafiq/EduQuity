import React from "react";
import { useColorContext } from "../context/ColorContextProvider";
import { useState } from "react";
import { RequestModal } from "../components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import supabaseClient from "../pages/utils/supabase";

const ResourceType = {
  1: 'Laptop',
  2: 'Tablet',
  3: 'Smartphone',
  4: 'IT Teacher',
  5: 'IT Technician',
}

function ClickableCard2({ children, className, newLog, type }) {
  const colors = useColorContext();
  const [show, setShow] = useState(false);

  const submit = async () => {
    newLog.resource = type
    const { data, error } = await supabaseClient.from("request_log").insert(
      newLog
    )
    setShow(false)
    console.log(error)
  }
  return (
    <>
      <div
        onClick={() => setShow(true)}
        className={`rounded-2xl bg-white ${className}`}
      >
        {children}
      </div>

      <RequestModal open={show} onClose={() => setShow(false)}>
        <div className="justify-items-center align-middle">
          <div className="text-4xl font-extrabold pb-8 text-center">
            Request {ResourceType[type]}
          </div>
          <Form
            className="flex flex-col justify-center items-center"
            style={{ width: "100%", height: "100%" }}
          >
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Control
                className="w-full text-2xl border-4 border-[#686E7B] py-4 px-8 rounded-xl"
                type="number"
                placeholder="Request Amount"
                onChange={(e) => {
                  newLog.quantity = e.target.value
                }}
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
              className="mt-2 text-2xl font-semibold bg-[#6259CA] rounded-xl py-2 px-6 text-white"
              onClick={submit}
            >
              Send
            </Button>
          </Form>
        </div>
      </RequestModal>
    </>
  );
}

export default ClickableCard2;

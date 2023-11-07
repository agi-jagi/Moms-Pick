import React from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
// import "./InputField.css";

const InputField = (props: any) => {
  return (
    <div
      className="input-area"
      style={{ display: "flex", position: "fixed", bottom: "80px", width: "100%" }}
    >
      <div
        className="plus-button"
        style={{ display: "flex", justifyContent: "center", width: "50px", fontSize: "24px" }}
      >
        +
      </div>
      <form
        onSubmit={() => console.log(props.message)}
        className="input-container"
        style={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Input
          placeholder="Type in here…"
          value={props.message}
          onChange={(event) => props.setMessage(event.target.value)}
          style={{ width: "100%", height: "100%" }}
        />

        <Button
          disabled={props.message === ""}
          type="submit"
          className="send-button"
          style={{ minWidth: "70px" }}
        >
          전송
        </Button>
      </form>
    </div>
  );
};

export default InputField;

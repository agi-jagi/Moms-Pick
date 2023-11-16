"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import Star from "./Star";
import instance from "@/app/_config/axios";

export default function Rating(props: any) {
  const [rating, setRating] = useState(3);

  const ratingOpponent = () => {
    instance
      .put(`/api/users/trades/${props.tradeId}/rating`, {
        rate: rating,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Modal
        isOpen={props.isOpen}
        placement="bottom"
        onOpenChange={props.onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        hideCloseButton={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <p>상대방은 어땠나요?</p>
                  <Button
                    style={{ backgroundColor: "#5E9FF2" }}
                    onClick={() => {
                      onClose();
                      ratingOpponent();
                      if (props.isSeller) {
                        const data = {
                          chatRoomId: props.chatRoomId,
                          message: "<Button onClick={onOpen()}>판매자는 어땠나요?</Button>",
                        };
                        if (props.socket && props.socket.readyState === WebSocket.OPEN) {
                          props.socket.send(JSON.stringify(data));
                        }
                      }
                    }}
                    // onPress={onClose}
                  >
                    확인
                  </Button>
                </div>
              </ModalHeader>
              <ModalBody>
                <Star rating={rating} setRating={setRating} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

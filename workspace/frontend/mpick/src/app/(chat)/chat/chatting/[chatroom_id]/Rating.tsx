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

export default function Rating(props: any) {
  const [rating, setRating] = useState(3);

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
                  <Button color="primary" onPress={onClose}>
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

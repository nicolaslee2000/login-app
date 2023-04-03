import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import Button from "../components/Button/Button";

export default function LoginButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => (modalOpen ? setModalOpen(false) : setModalOpen(true))}
        text="Sign in"
      />

      {modalOpen && (
        <Modal modalOpen={modalOpen} handleClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

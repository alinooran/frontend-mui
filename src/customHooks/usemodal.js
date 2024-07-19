import { useState } from "react";

const useModal = (setState) => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (state) => {
        setState(state);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return [modalOpen, openModal, closeModal];
}

export default useModal;
import icons from "@/assets/icons";
import { ModalProps } from "@/types";

import Button from "../Button";

const Modal = ({ title, children, open, onClose, onSubmit }: ModalProps) => {
    if (!open) return null;

    return (
        <div className="modal">
            <div className="modal__wrapper">
                <section className="modal__header">
                    <h1 className="modal__title">{title}</h1>

                    <button className="modal__close" onClick={onClose}>
                        <img
                            src={icons.close}
                            alt=""
                            className="modal__icon icon"
                        />
                    </button>
                </section>

                <div className="modal__desc">{children}</div>

                <div className="modal__footer">
                    <Button
                        className="modal__button"
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="modal__button"
                        variant="primary"
                        onClick={onSubmit}
                    >
                        OK
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

import React from "react";
import type { ModalProps } from "../../types";

const Poppup: React.FC<ModalProps> = ({ isOpen, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute left top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 inset-0 h-max items-center justify-center bg-black bg-opacity-40 z-50 ">
            <div>
                <h3 className="text-lg font-semibold mb-4">{title}</h3>
                <div className="space-y-4">{children}</div>
            </div>
        </div>
    );
};

export default Poppup;
import React, { useState } from "react";
import type { CardProps } from "../../types";
import Modal from "../Poppup/Poppup";
import Input from "../Input/Input";

const ProfileCard: React.FC<CardProps> = ({ employee, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(employee);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onUpdate(formData);
        setIsOpen(false);
    };

    return (
        <>
            <div className="max-w-sm p-6 mt-14 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <button
                    onClick={() => setIsOpen(true)}
                    className="ms-auto block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Edit
                </button>
                <div>
                    <img
                        width={100}
                        className="rounded-full mx-auto mb-2"
                        src={employee.avatarUrl}
                        alt=""
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-3">
                        {employee.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {employee.role}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {employee.department}
                    </p>
                </div>
            </div>
            
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onSave={handleSave}
                title="Edit Employee"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="flex flex-col gap-3"
                >
                    <Input
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Save
                    </button>
                </form>
            </Modal>

        </>
    );
};

export default ProfileCard;

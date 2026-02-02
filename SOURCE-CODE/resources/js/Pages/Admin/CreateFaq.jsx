import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

const CreateFaq = () => {
    const { data, setData, post, errors } = useForm({
        question: "",
        answer: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.faqs.store"));
    };

    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="create-faq-form">
                <h1 className="create-faq-heading">Create FAQ</h1>
                <div className="form-group">
                    <label className="form-label">Question:</label>
                    <input
                        type="text"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        className="form-input"
                        required
                    />
                    {errors.question && <span>{errors.question}</span>}
                </div>
                <div className="form-group">
                    <label className="form-label">Answer:</label>
                    <textarea
                        value={data.answer}
                        onChange={(e) => setData("answer", e.target.value)}
                        required
                    />
                    {errors.answer && <span>{errors.answer}</span>}
                </div>
                <button type="submit" className="submit-button">
                    Create
                </button>
            </form>
        </AdminLayout>
    );
};

export default CreateFaq;

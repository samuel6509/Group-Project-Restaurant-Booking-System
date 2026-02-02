import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { useForm, router } from "@inertiajs/react";
import { toast } from "react-toastify";

const EditFaq = ({ faq }) => {
    const { data, setData, errors } = useForm({
        question: faq.question,
        answer: faq.answer,
    });


      const handleSubmit = (e) => {
          e.preventDefault();
    
          router.put(
              `/admin/faqs/${faq.id}`,
              {
                  question: data.question,
                  answer: data.answer,
              },
              {
                  onSuccess: () => {
                      toast.success("FAQ updated successfully!");
                      if (page.props.faq) {
                          setData(page.props.faq);
                      }
                  },
                  onError: () => {
                      toast.error("Failed to update FAQ. Please try again.");
                  },
              }
          );
      };

    
    return (
        <AdminLayout>
            <form onSubmit={handleSubmit} className="edit-faq-form">
                <h1 className="edit-faq-heading">Edit FAQ</h1>
                <div className="form-group">
                    <label className="form-label">Question:</label>
                    <input
                        type="text"
                        value={data.question}
                        onChange={(e) => setData("question", e.target.value)}
                        required
                        className="form-input"
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
                    Update
                </button>
            </form>
        </AdminLayout>
    );
};

export default EditFaq;

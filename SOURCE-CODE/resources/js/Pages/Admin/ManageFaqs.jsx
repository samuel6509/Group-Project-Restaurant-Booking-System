import React from "react";
import AdminLayout from "../../Layouts/AdminLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageFaqs = () => {
    const { faqs } = usePage().props;

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You are about to delete this FAQs!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/faqs/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            "The FAQs has been deleted successfully.",
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "Failed to delete the FAQs. Please try again.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedFaqs = Array.from(faqs.data);
        const [movedFaq] = reorderedFaqs.splice(result.source.index, 1);
        reorderedFaqs.splice(result.destination.index, 0, movedFaq);

        const updatedOrder = reorderedFaqs.map((faq, index) => ({
            id: faq.id,
            order: index + 1,
        }));

        router.patch(
            "/admin/faqs/reorder",
            { faqs: updatedOrder },
            {
                // onSuccess: () => alert("FAQs reordered successfully."),
                onSuccess: () => {
                    toast.success("FAQs reordered successfully.");
                },
                onError: () => {
                    toast.error("Failed to reorder FAQs. Please try again.");
                },
            }
        );
    };

    return (
        <AdminLayout>
            <div className="faqs-container">
                <h1 className="faqs-heading">Manage FAQs</h1>

                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="faqs">
                        {(provided) => (
                            <table
                                className="faqs-table"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqs.data.map((faq, index) => (
                                        <Draggable
                                            key={faq.id}
                                            draggableId={faq.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <td>{index + 1}</td>
                                                    <td>{faq.question}</td>
                                                    <td>{faq.answer}</td>
                                                    <td>
                                                        <Link
                                                            href={route(
                                                                "admin.faqs.edit",
                                                                faq.id
                                                            )}
                                                            className="edit-button"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    faq.id
                                                                )
                                                            }
                                                            className="delete-button"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </tbody>
                            </table>
                        )}
                    </Droppable>
                </DragDropContext>
                <div className="pagination-container">
                    {faqs?.links?.map((link, index) => (
                        <button
                            key={index}
                            onClick={() => Inertia.get(link.url)}
                            className={`pagination-button ${
                                link.active ? "active-pagination-button" : ""
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageFaqs;

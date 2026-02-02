import { useEffect, useState } from "react";
import DateInput from "../utils/DateInput";
import { useItem } from "../context/ItemProvider";

function AddExpense() {
    const item = useItem();

    useEffect(() => {
        console.log("item.editableRecord", item.editableRecord)
        if (item.editableRecord) {
            item.setFormData(() => ({
                date: item.editableRecord[0].date,
                category: item.editableRecord[0].category,
                amount: item.editableRecord[0].amount,
                id: item.editableRecord[0].id
            }))
        } else {
            item.setFormData(() => ({
                date: null,
                category: '',
                amount: '',
                id: null
            }));
        }

        return () => {
            item.setEditableRecord(null);
        }
    }, [item.editableRecord])
    const isFormValid =
        item.formData.date !== null &&
        item.formData.category.trim() !== "" &&
        Number(item.formData.amount) > 0;

    return <>
        <form className="space-y-4 max-w-[400px] mx-auto mt-4 px-4 sm:px-0">
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Date
                </label>
                <DateInput selectedDate={item.formData.date} setSelectedDate={item.dateChanged} />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Item
                </label>
                <input
                    type="text"
                    placeholder="Enter item purchased"
                    value={item.formData.category}
                    name="category"
                    onChange={item.dataChanged}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Amount
                </label>
                <input
                    type="number"
                    placeholder="Enter amount"
                    value={item.formData.amount}
                    name="amount"
                    onChange={item.dataChanged}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>
            <button
                disabled={!isFormValid}
                type="button"
                onClick={item.submitDetails}
                className={`w-full rounded-lg py-2 px-4 text-white font-medium transition 
          ${isFormValid ? "bg-blue-600 hover:bg-blue-700 cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
            >
                Submit
            </button>
        </form>
    </>
}

export default AddExpense;
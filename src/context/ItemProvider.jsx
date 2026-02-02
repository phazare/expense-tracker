import { createContext, useContext, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExcelJS from "exceljs";
import { useLocalStorage } from "../hooks/useLocalStorage";

const ItemContext = createContext();
function ItemProvider({ children }) {
    const [storedValue, setStoredValue] = useLocalStorage('formData');
    const [state, dispatch] = useReducer(itemReducer, storedValue);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        date: null,
        category: '',
        amount: '',
        id: null
    });
    const [editableRecord, setEditableRecord] = useState(null);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = new Date().getMonth();
    const data = [
        {
            year: new Date().getFullYear(),
            allowedMonths: [months[new Date().getMonth() - 1], months[new Date().getMonth()]]
        }
    ]

    function itemReducer(state, action) {
        switch (action.type) {
            case 'add': {
                const newData = [...state, action.payload];
                setStoredValue(newData)
                return newData
            }
            case 'delete': {
                const updatedData = state.filter(x => x.id !== action.payload);
                setStoredValue(updatedData)
                return [...updatedData];
            }
            case 'update': {
                const updated = state.map(data => data.id === action.payload.id ? action.payload : data);
                setStoredValue(updated)
                return updated
            }
            default: return state
        }
    }
    function dataChanged(event) {
        const { name, value } = event.target
        setFormData(prev => ({
            ...prev, [name]: value
        }))
    }
    function dateChanged(event) {
        setFormData(prev => ({ ...prev, date: event }))
    }
    function editExpense(id) {
        setEditableRecord(state.filter(x => x.id == id));
        navigate(`/edit-expense/${id}`)
    }
    function openReports(month) {
        navigate(`/view-report/${month.toLowerCase()}`)
    }
    function submitDetails() {
        if (formData.amount !== 0 && formData.category !== '' && formData.date !== null) {
            const isAvailable = state.some(x => x.id === formData.id);
            if (isAvailable) {
                dispatch({ type: 'update', payload: formData })
            } else {
                const newFormData = { ...formData, id: Math.round(Math.random() * 1000) }
                dispatch({ type: 'add', payload: newFormData });
            }
            setFormData(() => ({
                date: null,
                category: '',
                amount: '',
                id: null
            }));

        } else {
            console.log("form not vaild")
        }
    }
    async function exportToExcel(id) {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Expenses");

        sheet.columns = [
            { header: "Date", key: "date", width: 15 },
            { header: "Category", key: "category", width: 20 },
            { header: "Amount", key: "amount", width: 10 }
        ];
        const data = state.filter((x) => months[new Date(x.date).getMonth()].toLowerCase() === id).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        if (data.length === 0) return;
        data.forEach(item => {
            sheet.addRow({
                date: new Date(item.date).toLocaleDateString("en-GB"),
                category: item.category,
                amount: item.amount
            });
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer]);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `${id} expenses.xlsx`;
        a.click();
    }

    return <ItemContext.Provider value={{ months, openReports, currentMonth, state, dispatch, data, editExpense, editableRecord, setEditableRecord, dataChanged, dateChanged, submitDetails, formData, setFormData, exportToExcel }}>{children}</ItemContext.Provider>
}
export const useItem = () => useContext(ItemContext);

export default ItemProvider;
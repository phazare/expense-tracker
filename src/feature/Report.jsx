import { useParams } from "react-router-dom";
import { useItem } from "../context/ItemProvider";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useDebounce } from "../hooks/useDebounce";
import { useState, useEffect, useMemo } from "react";
import ExcelJS from "exceljs";

function Report() {
    const items = useItem();
    const { id } = useParams();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500)
    const itemList = useMemo(() => {
        return items.state.filter(x => items.months[new Date(x.date).getMonth()].toLowerCase() == id
        ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [items.state, id])
    const filteredList = useMemo(() => {
        return itemList.filter(searchList => searchList.category.toLowerCase().includes(debouncedSearch.toLowerCase()));
    }, [itemList, debouncedSearch])

    const rowCount = filteredList.length;
    const total = filteredList.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    function handleInputChange(event) {
        setSearch(event.target.value)
    }
    function importFile(e) {
        const file = e.target.files[0];
        if (!file) return
        const workbook = new ExcelJS.Workbook();
        const reader = new FileReader();
        reader.onload = async (event) => {
            const buffer = event.target.result;

            await workbook.xlsx.load(buffer);

            const worksheet = workbook.worksheets[0]; // first sheet
            const rows = [];

            worksheet.eachRow((row, rowNumber) => {
                if (rowNumber === 1) return; // skip header row

                rows.push({
                    date: row.getCell(1).value,
                    category: row.getCell(2).value,
                    amount: row.getCell(3).value,
                });
            });
        };
        reader.readAsArrayBuffer(file);
    }

    return <>
        <div className="text-center"><input name='search' className="w-full max-w-sm rounded-lg border border-gray-300 px-4 py-2 text-sm 
             focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-4 mx-4" placeholder="Search..." type="text" value={search} onChange={handleInputChange} /></div>
        {rowCount > 0 &&
            <table className="mt-4 mx-auto w-full max-w-[400px] border border-gray-200 rounded-xl bg-white text-center px-4 sm:px-0">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">
                            Date
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">
                            Category
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">
                            Amount
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredList.map((item) => (
                        <tr key={item.id} className="border-t hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700">{new Date(item.date)?.toLocaleDateString("en-GB")}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 capitalize">{item.category}</td>
                            <td className="border border-gray-300 px-4 py-2 text-sm font-medium text-black-600">
                                ${item.amount}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <div className="flex items-center gap-3">
                                    <button
                                        title="Edit"
                                        className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition cursor-pointer"
                                        onClick={() => items.editExpense(item.id)}
                                    >
                                        <FiEdit size={18} />
                                    </button>

                                    <button
                                        title="Delete"
                                        className="p-2 rounded-full text-red-600 hover:bg-red-100 transition cursor-pointer"
                                        onClick={() => items.dispatch({ type: 'delete', payload: item.id })}
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td></td>
                        <td></td>
                        <td><strong>{total.toFixed(2)}</strong></td>
                    </tr>
                </tfoot>
            </table>
        }
        {rowCount > 0 && <button className="mb-4 mx-auto mt-4 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
    hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-95 transition sursor-pointer" onClick={() => items.exportToExcel(id)}>Export</button>}
        {rowCount === 0 && <div className="flex h-full min-h-[60vh] items-center justify-center">
            <p className="text-gray-500 text-lg">
                No data available
            </p>
        </div>}
    </>
}

export default Report;
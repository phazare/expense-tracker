import { useParams } from "react-router-dom";
import { useItem } from "../context/ItemProvider";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Report() {
    const items = useItem();
    const { id } = useParams();
    const itemList = items.state.filter(x => {
        return items.months[new Date(x.date).getMonth()].toLowerCase() == id
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const rowCount = itemList.length;
    const total = itemList.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    return <>
        {rowCount > 0 &&
            <table className="mt-4 mx-auto w-full max-w-[400px] border border-gray-200 rounded-xl bg-white text-center">
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
                    {itemList.map((item) => (
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
                        <td><strong>{total}</strong></td>
                    </tr>
                </tfoot>
            </table>
        }
        {rowCount === 0 && <h2>No data available</h2>}
        <button className="mx-auto mt-4 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm
    hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 active:scale-95 transition sursor-pointer" onClick={() => items.exportToExcel(id)}>Export</button>
    </>
}

export default Report;
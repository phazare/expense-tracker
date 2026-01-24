import { useItem } from "../context/ItemProvider";

function MonthCard({ month }) {
    const item = useItem();
    const itemList = item.state?.filter(x => item.months[new Date(x.date).getMonth()] === month);
    const total = itemList?.reduce((acc, curr) => Number(acc) + Number(curr.amount), 0)
    return <div
        onClick={() => item.openReports(month)}
        className="cursor-pointer bg-green-100 rounded-lg p-4 sm:p-6 m-3 text-blue-600"
    >
        <h2 className="text-lg sm:text-2xl text-gray-900 font-bold truncate">
            {month}
        </h2>

        <p className="mt-2 text-lg sm:text-2xl font-bold text-gray-900 break-words">
            ${total || 0}
        </p>
    </div>
}
export default MonthCard;
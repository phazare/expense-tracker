import { useItem } from "../context/ItemProvider";
import MonthList from './MonthList'
function Dashboard() {
    const item = useItem();
    return <>
        <div className="grid grid-cols-1 gap-6 text-center">
            {item.data.map((list, index) =>
                <div key={index} className="p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">{list.year}</h2>
                    <MonthList months={list.allowedMonths} />
                </div>
            )
            }
        </div>
    </>
}

export default Dashboard;
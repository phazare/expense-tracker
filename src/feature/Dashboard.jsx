import { useItem } from "../context/ItemProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import MonthList from './MonthList'
function Dashboard() {
    const item = useItem();
    const [value, setValue] = useLocalStorage('test', [])
    function setVal() {
        setValue([{ 'name': 'palak' }])
    }
    return <>
        <div className="grid grid-cols-1 gap-6 text-center">
            {item.data.map((list, index) =>
                <div key={index} className="p-4 rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">{list.year}</h2>
                    <MonthList months={list.allowedMonths} />
                </div>
            )
            }
            <button onClick={setVal}>Add localStorage</button>
            <div>{JSON.stringify(value)}</div>
        </div>
    </>
}

export default Dashboard;
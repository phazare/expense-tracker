import MonthCard from "./MonthCard";

function MonthList({ months }) {
    return <>
        <div className="grid grid-cols-3 gap-2 mt-auto">
            {months.map((month, index) => <MonthCard key={index} month={month} />)}
        </div>
    </>

}

export default MonthList;
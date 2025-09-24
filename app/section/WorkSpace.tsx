import Dashboard from "../Components/Dashboard";
import Header from "../Components/Header";
import Expenditure from "./Expenditure";

export default function WorkSpace() {
  return (
    <div className="WorkSpace">
        <Header/>
        <Dashboard/>
        <Expenditure/>
    </div>
  );
}

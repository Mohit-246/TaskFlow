import { useContext, useState } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AddTask from "./component/AddTask";
import Header from "./component/Header";
import TaskList from "./component/TaskList";
import SignIn from "./component/SignIn";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <ToastContainer />
      <div>
        <Header />
        <main className="h-screen">
          {isLoggedIn ? (
            <>
              <AddTask />
              <TaskList />
            </>
          ) : (
            <>
              <SignIn />
            </>
          )}
        </main>
      </div>
    </>
  );
}

export default App;

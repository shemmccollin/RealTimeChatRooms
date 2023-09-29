import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import { useReducer } from "react";
import { reducer } from "../useHooks/ChatRoomReducer";
import React from "react";

export const ChatRoomContext = React.createContext<{
  state: any;
  dispatch: any;
}>({ state: {}, dispatch: () => undefined });

function Root() {
  const [state, dispatch] = useReducer(reducer, {
    user: {},
    showUser: false,
    showAdmin: false,
  });

  return (
    <>
      <ChatRoomContext.Provider value={{ state, dispatch }}>
        <Header />
        <Outlet />
        <ToastContainer />
      </ChatRoomContext.Provider>
    </>
  );
}

export default Root;

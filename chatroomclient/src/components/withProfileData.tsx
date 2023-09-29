import { useContext } from "react";
import { ChatRoomContext } from "../routes/Root";

export default function withProfileData(Component: any) {
  function EnchancedComponent() {
    const { state } = useContext(ChatRoomContext);
    const { user }: any = state;

    return <Component user={user} />;
  }

  return EnchancedComponent;
}

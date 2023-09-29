import { RiWechatFill } from "react-icons/ri";
import { Ichannel } from "../models/interfaces";
import Nav from "react-bootstrap/Nav";

function Channels({ channels, activeKey, onChangeActive, onSubscribe }: any) {
  const onSelect = (e: any) => {
    onChangeActive(e);
  };
  return (
    <>
      <h3 className="border-bottom text-center">Channels</h3>
      <div className="overflow-auto" style={{ maxHeight: "70vh" }}>
        <Nav
          variant="pills"
          activeKey={activeKey}
          onSelect={onSelect}
          className="flex-column"
        >
          {channels.map((channel: Ichannel) => (
            <Nav.Item key={channel.id}>
              <Nav.Link
                className="text-center"
                eventKey={channel.id}
                onClick={() => {
                  onSubscribe(channel.id, channel.channel);
                }}
              >
                {channel.channel}
                <RiWechatFill className="ms-1" />
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </>
  );
}
export default Channels;

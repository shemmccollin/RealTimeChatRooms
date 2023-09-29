import Button from "react-bootstrap/Button";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ChannelRow({ channel, onSendMessage }: any) {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/dashboard/editchannel/${channel.id}`);
  };

  return (
    <>
      <tr>
        <td>{channel.id}</td>
        <td>{channel.channel}</td>
        <td>{channel.timestamp}</td>
        <td>
          <Button
            className="me-4 mb-2"
            size="lg"
            variant="warning"
            onClick={onEdit}
          >
            <MdModeEditOutline className="mb-1" />
            Edit
          </Button>
          <Button
            className="mb-2"
            variant="danger"
            size="lg"
            onClick={() => onSendMessage(channel)}
          >
            <AiFillDelete className="mb-1" />
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
}

export default ChannelRow;

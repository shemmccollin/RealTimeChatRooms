import renderer from "react-test-renderer";
import ChannelForm from "../components/ChannelForm";

it("Channel Form matches snapshot", () => {
  const initialValues = {
    id: "",
    channel: "",
    status: "",
    timestamp: "",
  };

  const onSendMessage = (newChannel: any) => {};
  const component = renderer.create(
    <ChannelForm initialValues={initialValues} onSendMessage={onSendMessage} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

//   renderer.act(() => {
//     tree.props.onSendMessage();
//   });

//   tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
});

import Table from "react-bootstrap/Table";

function ChannelTable({ children }: any) {
  return (
    <>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Channel Name</th>
            <th>TimeStamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </>
  );
}

export default ChannelTable;

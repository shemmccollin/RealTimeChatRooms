import React from "react";
import Image from "react-bootstrap/Image";

class ComponentTree extends React.Component {
  render() {
    return (
      <>
        <div style={{ marginLeft: "262px" }}>
          <Image src="tree/img1.jpg" />
        </div>
        <div style={{ marginLeft: "250px" }}>
          <Image src="tree/img2.jpg" />
        </div>
        <div>
          <Image src="tree/img3.jpg" />
        </div>
        <div style={{ marginLeft: "253px" }}>
          <Image src="tree/img4.jpg" />
        </div>
      </>
    );
  }
}

export default ComponentTree;

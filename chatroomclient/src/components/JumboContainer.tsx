import React from "react";

class JumboContainer extends React.Component {
  render() {
    const { children }: any = this.props;
    return (
      <>
        <div className="p-2">
          <h1 className="display-4">
            Welcome to Chatrooms: A Realtime Chat Experience
          </h1>
          <p className="lead">
            A place to come and chat about different topics or have a good laugh
            with some friends or strangers, either way, this is the place to
            come and chill.
          </p>
          <hr className="my-4" />
          <p>
            Sign up for an account and unlock the chatrooms. Unlimited members,
            unlimited discussions.
          </p>
        </div>
        {children}
      </>
    );
  }
}

export default JumboContainer;

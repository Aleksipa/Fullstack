import React from "react";

function Footer() {
  const footerStyle = {
    color: "#808080",
    fontStyle: "italic",
    fontSize: 16,
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Blog list app, Department of Computer Science, University of Helsinki
        2022
      </em>
    </div>
  );
}

export default Footer;

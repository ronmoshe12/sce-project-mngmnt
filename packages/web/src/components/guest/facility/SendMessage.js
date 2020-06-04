import React, { useState } from "react";
import { validation } from "@project/common";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button, Box } from "@material-ui/core";
import MyFormik from "../../common/MyFormik";

export default function SendMessage({ managerID }) {
  const [show, setShow] = useState(false);
  const userID = useSelector((state) => state.auth.user.id);
  const afterDefaultSubmit = () => {
    setShow(false);
  };

  return (
    <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
      {!show ? (
        <Button color="secondary" onClick={() => setShow(true)}>
          message facility manager
        </Button>
      ) : (
        <MyFormik
          afterDefualtSubmit={afterDefaultSubmit}
          onSubmit="/users/messages"
          fields={[
            {
              fieldName: "to",
              type: "invisible",
              initialValue: managerID,
            },
            {
              fieldName: "from",
              type: "invisible",
              initialValue: userID,
            },
            {
              fieldName: "message",
              type: "textarea",
              label: "Message",
              initialValue: "",
              rows: 2,
              rowsMax: 4,
            },
          ]}
          validationSchema={validation.forms.message}
        />
      )}
    </Box>
  );
}

SendMessage.propTypes = {
  managerID: PropTypes.string.isRequired,
};

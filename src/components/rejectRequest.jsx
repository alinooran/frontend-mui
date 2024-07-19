import { Button, Stack } from "@mui/material";
import styled from "@emotion/styled";
import Input from "./input";
import { api } from "../api/api";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";

const Container = styled(Stack)(({ theme }) => ({
  width: "100%",
  height: "100%",
  alignItems: "flex-start",
  padding: "8px 12px",
  justifyContent: "space-between",
}));

const RejectRequest = ({ id, index, setRequests, closeModal }) => {
  const [description, setDescription] = useState("");

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  const handleReject = async () => {
    try {
      await api.post(`/request/${id}/reject`, {
        description: description,
      });
      setRequests((requests) => {
        return requests.filter((item, i) => i !== index);
      });
      toast.success("درخواست رد شد", toastOption);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
    closeModal();
  };

  return (
    <Container>
      <Input
        label="توضیحات"
        type="textarea"
        value={description}
        onChange={handleInput}
        inputSx={{ height: "90px", width: "100%" }}
      />
      <Button
        color="error"
        variant="contained"
        onClick={handleReject}
      >
        رد درخواست
      </Button>
    </Container>
  );
};

export default RejectRequest;

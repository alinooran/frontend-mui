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

const SendRequest = ({ id, index, setRequests, closeModal }) => {
  const [description, setDescription] = useState("");

  const handleInput = (e) => {
    setDescription(e.target.value);
  };

  const handleSend = async () => {
    try {
      await api.post(`/request/${id}`, {
        description: description,
      });
      setRequests((requests) => {
        return requests.filter((item, i) => i !== index);
      });
      toast.success("درخواست ارسال شد", toastOption);
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
        sx={{ padding: "0.4em 3em" }}
        color="secondary"
        variant="contained"
        onClick={handleSend}
      >
        ارسال
      </Button>
    </Container>
  );
};

export default SendRequest;

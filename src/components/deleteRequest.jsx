import styled from "@emotion/styled";
import { Button, Stack, Typography } from "@mui/material";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";

const Container = styled(Stack)(({theme}) => ({
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "1.8em"
}));

const DeleteRequest = ({ id, index, setRequests, closeModal }) => {

    const handleApprove = async () => {
        try {
          await api.delete(`/request/${id}`);
          setRequests((requests) => {
            return requests.filter((item, i) => i !== index);
          });
          toast.success("درخواست حذف شد", toastOption);
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
            <Typography variant="body2">آیا از حذف درخواست اطمینان دارید؟</Typography>
            <Button onClick={handleApprove} variant="contained" color="error" sx={{width: "100%"}}>
                حذف درخواست
            </Button>
        </Container>
    );
}

export default DeleteRequest;
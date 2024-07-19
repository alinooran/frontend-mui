import styled from "@emotion/styled";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";

const Container = styled(Box)(({ theme }) => ({
  backgroundColor: "#F9F9F9",
  border: `1px solid ${theme.palette.secondary.main}`,
  borderRadius: "4px",
  position: "absolute",
  top: "50%",
  right: "50%",
  transform: "translate(50%, -50%)",
  padding: "4px",
}));

const Header = styled(Stack)(({ theme }) => ({
  background:
    "linear-gradient(90deg, rgba(131,111,255,1) 0%, rgba(79,67,153,1) 100%)",
  height: "25px",
  width: "100%",
  borderRadius: "4px",
  flexDirection: 'row',
  alignItems: 'center',
  paddingRight: '4px',
  gap: '1.5em'
}));

const CloseButton = styled(IconButton)(({theme}) => ({
    width: '18px',
    height: '18px',
    backgroundColor: theme.palette.text.main,
    borderRadius: '4px',
    color: theme.palette.secondary.main,
    "&:hover": {
        backgroundColor: theme.palette.text.main
    }
}));

const Title = styled(Typography)(({theme}) => ({
  fontSize: '0.75em',
  color: theme.palette.text.main,
}));

const Body = styled(Box)(({theme}) => ({
  width: '100%',
  height: 'calc(100% - 29px)',
  marginTop: '4px',
  position: 'relative'
}));

const MyModal = ({component, title, open, onClose, sx}) => {

  return (
    <Modal open={open}  disableAutoFocus>
      <Container sx={sx}>
        <Header>
            <CloseButton onClick={onClose}>
                <Close sx={{width: '16px', height: '16px'}} />
            </CloseButton>
            <Title>
              {title}
            </Title>
        </Header>
        <Body>
          {component}
        </Body>
      </Container>
    </Modal>
  );
};

export default MyModal;

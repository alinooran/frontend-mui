import styled from "@emotion/styled";
import {
  Box,
  IconButton,
  Pagination,
  PaginationItem,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  Tooltip,
} from "@mui/material";
import Input from "../components/input";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/context";
import { Td, Th, Tr } from "../components/custom";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Assignment,
  Cancel,
  Close,
  DeleteForever,
  Done,
  People,
  Reply,
} from "@mui/icons-material";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { toastOption } from "../util/util";
import moment from "jalali-moment";
import MyModal from "../components/modal";
import SendRequest from "../components/sendRequest";
import Workflow from "../components/workflow";
import RejectRequest from "../components/rejectRequest";
import ApproveRequest from "../components/approveRequest";
import DeleteRequest from "../components/deleteRequest";
import RequestGuest from "../components/requestGuests";
import useModal from "../customHooks/usemodal";
import MyPagination from "../components/pagination";
import CloseRequest from "../components/closeRequest";
import Container from "../components/common/container";

const MyIconButton = styled(IconButton)(({ theme }) => ({
  padding: "0",
  margin: "0 1px",
}));

const sendModalSx = {
  width: {
    xs: "50%",
    lg: "30%",
  },
  height: "300px",
  minWidth: "310px",
  maxWidth: "500px",
};

const workflowModalSx = {
  width: {
    xs: "90%",
  },
  height: "500px",
  minWidth: "310px",
  maxWidth: "1100px",
};

const approveModalSx = {
  height: "150px",
  width: "300px",
};

const Requests = () => {
  const { context } = useContext(AppContext);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [category, setCategory] = useState("unsent");
  const [requests, setRequests] = useState([]);
  // for saving request id and index for modal
  const [request, setRequest] = useState({
    id: 0,
    index: -1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sendModal, openSendModal, closeSendModal] = useModal(setRequest);
  const [workflowModal, openWorkflowModal, closeWorkflowModal] =
    useModal(setRequest);
  const [rejectModal, openRejectModal, closeRejectModal] = useModal(setRequest);
  const [approveModal, openApproveModal, closeApproveModal] =
    useModal(setRequest);
  const [deleteModal, openDeleteModal, closeDeleteModal] = useModal(setRequest);
  const [guestModal, openGuestModal, closeGuestModal] = useModal(setRequest);
  const [closeRequestModal, openCloseRequestModal, closeCloseRequestModal] = useModal(setRequest);
  const itemPerPage = 15;

  useEffect(() => {
    const role = context.profile.role;
    const options = [
      {
        value: "unsent",
        title: "ارسال نشده",
      },
      {
        value: "sent",
        title: "ارسال شده",
      },
    ];
    if (role === "dean" || role === "securityDean") {
      options.push({
        value: "forApproval",
        title: "در انتظار تایید",
      });
    }
    setCategoryOptions(options);
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [category]);

  const fetchRequests = async () => {
    try {
      const res = await api.get(`/request?cat=${category}`);
      res.data.data.forEach((r) => {
        const m = moment(r.date);
        m.locale("fa");
        r.date = m.format("YYYY/MM/DD");
      });
      setRequests(res.data.data);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error.message, toastOption);
      } else {
        toast.error("خطایی در سرور رخ داده", toastOption);
      }
    }
  };

  const handleFilter = (e) => {
    setCategory(e.target.value);
  };

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <MyModal
        title="ارسال با توضیحات"
        open={sendModal}
        onClose={closeSendModal}
        component={
          <SendRequest
            id={request.id}
            index={request.index}
            setRequests={setRequests}
            closeModal={closeSendModal}
          />
        }
        sx={sendModalSx}
      />
      <MyModal
        title="گردش کار"
        open={workflowModal}
        onClose={closeWorkflowModal}
        component={<Workflow id={request.id} />}
        sx={workflowModalSx}
      />
      <MyModal
        title="رد با توضیحات"
        open={rejectModal}
        onClose={closeRejectModal}
        component={
          <RejectRequest
            id={request.id}
            index={request.index}
            setRequests={setRequests}
            closeModal={closeRejectModal}
          />
        }
        sx={sendModalSx}
      />
      <MyModal
        title="تایید درخواست"
        open={approveModal}
        onClose={closeApproveModal}
        component={
          <ApproveRequest
            id={request.id}
            index={request.index}
            setRequests={setRequests}
            closeModal={closeApproveModal}
          />
        }
        sx={approveModalSx}
      />
      <MyModal
        title="حذف درخواست"
        open={deleteModal}
        onClose={closeDeleteModal}
        component={
          <DeleteRequest
            id={request.id}
            index={request.index}
            setRequests={setRequests}
            closeModal={closeDeleteModal}
          />
        }
        sx={approveModalSx}
      />
      <MyModal
        title="بستن درخواست"
        open={closeRequestModal}
        onClose={closeCloseRequestModal}
        component={
          <CloseRequest
            id={request.id}
            index={request.index}
            setRequests={setRequests}
            closeModal={closeCloseRequestModal}
          />
        }
        sx={approveModalSx}
      />
      <MyModal
        title="لیست مهمان ها"
        open={guestModal}
        onClose={closeGuestModal}
        component={<RequestGuest id={request.id} />}
        sx={workflowModalSx}
      />
      <Container>
        <Box width={"100%"}>
          <Input
            type="select"
            width={"20%"}
            containerSx={{ minWidth: "250px" }}
            options={categoryOptions}
            onChange={handleFilter}
            inputSx={{ borderRadius: "0", padding: "4px 6px" }}
          />
        </Box>
        <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
          <Table sx={{ margin: "0.5em 0", minWidth: "750px" }}>
            <TableHead>
              <Tr>
                <Th>ردیف</Th>
                <Th>تاریخ</Th>
                <Th>وضعیت نهایی</Th>
                <Th>عملیات</Th>
              </Tr>
            </TableHead>
            <TableBody>
              {requests.length === 0 && (
                <Tr>
                  <Th colSpan={5}>درخواستی وجود ندارد</Th>
                </Tr>
              )}
              {requests
                .slice(
                  (currentPage - 1) * itemPerPage,
                  currentPage * itemPerPage
                )
                .map((r, i) => {
                  return (
                    <Tr key={r.ID}>
                      <Td>{(currentPage - 1) * itemPerPage + i + 1}</Td>
                      <Td>{r.date}</Td>
                      <Td>
                        {r.final_status === null
                          ? "در انتظار تایید"
                          : r.final_status === true
                          ? "تایید شده"
                          : "رد شده"}
                      </Td>
                      <Td>
                        {r.sent === false ? (
                          <>
                            <Tooltip title="ارسال با توضیحات">
                              <MyIconButton
                                onClick={() =>
                                  openSendModal({ id: r.ID, index: i })
                                }
                              >
                                <Reply
                                  sx={{
                                    transform: "scaleX(-1)",
                                    fontSize: "0.8em",
                                  }}
                                />
                              </MyIconButton>
                            </Tooltip>
                            <Tooltip title="بستن درخواست">
                              <MyIconButton
                                onClick={() =>
                                  openCloseRequestModal({ id: r.ID, index: i })
                                }
                              >
                                <Cancel
                                  sx={{
                                    fontSize: "0.8em",
                                  }}
                                />
                              </MyIconButton>
                            </Tooltip>
                          </>
                        ) : (
                          ""
                        )}
                        {category === "forApproval" ? (
                          <>
                            <Tooltip title="تایید">
                              <MyIconButton
                                onClick={() => {
                                  openApproveModal({ id: r.ID, index: i });
                                }}
                              >
                                <Done sx={{ fontSize: "0.8em" }} />
                              </MyIconButton>
                            </Tooltip>
                            <Tooltip title="رد با توضیحات">
                              <MyIconButton
                                onClick={() =>
                                  openRejectModal({ id: r.ID, index: i })
                                }
                              >
                                <Close sx={{ fontSize: "0.8em" }} />
                              </MyIconButton>
                            </Tooltip>
                          </>
                        ) : (
                          ""
                        )}
                        <Tooltip title="لیست مهمان ها">
                          <MyIconButton
                            onClick={() => openGuestModal({ id: r.ID })}
                          >
                            <People sx={{ fontSize: "0.8em" }} />
                          </MyIconButton>
                        </Tooltip>
                        <Tooltip title="گردش کار">
                          <MyIconButton
                            onClick={() => openWorkflowModal({ id: r.ID })}
                          >
                            <Assignment sx={{ fontSize: "0.8em" }} />
                          </MyIconButton>
                        </Tooltip>
                        {category === "unsent" ? (
                          <Tooltip title="حذف">
                            <MyIconButton
                              onClick={() =>
                                openDeleteModal({ id: r.ID, index: i })
                              }
                            >
                              <DeleteForever sx={{ fontSize: "0.8em" }} />
                            </MyIconButton>
                          </Tooltip>
                        ) : (
                          ""
                        )}
                      </Td>
                    </Tr>
                  );
                })}
            </TableBody>
            <TableFooter>
              <Tr>
                <Td colSpan={5}>
                  <MyPagination
                    pageCount={Math.ceil(requests.length / itemPerPage)}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                  />
                </Td>
              </Tr>
            </TableFooter>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Requests;

import React, { useEffect, useReducer, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { deleteUser, getUsers } from "../../../Services/API";
import { Link } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { initialState, reducer } from "../../../Hooks/Functions";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from "primereact/dialog";
import * as XLSX from "xlsx";

function Usereducertable() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dt = useRef(null);

  const handleSearch = (e) => {
    dispatch({ type: "SET_SEARCH_TEXT", value: e.target.value });
  };

  const filteredData = state.apiData
    ? state.apiData.filter((row) => {
        const searchText = state.searchText.toLowerCase();
        return (
          (row.name && row.name.toLowerCase().includes(searchText)) ||
          (row.email && row.email.toLowerCase().includes(searchText)) ||
          (row.phone && row.phone.toLowerCase().includes(searchText)) ||
          (row.password && row.password.toLowerCase().includes(searchText)) ||
          (row.cpass && row.cpass.toLowerCase().includes(searchText)) ||
          (row.language && row.language.toLowerCase().includes(searchText)) ||
          (row.gender && row.gender.toLowerCase().includes(searchText)) ||
          (row.dob && row.dob.toLowerCase().includes(searchText))
        );
      })
    : [];

  const clearFilters = () => {
    dt.current.reset();
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then((autoTable) => {
        const doc = new jsPDF.default();
        doc.autoTable({
          head: [
            [
              "Name",
              "E-mail",
              "Phone",
              "Password",
              "Confirm Password",
              "Language",
              "Gender",
              "Date of Birth",
            ],
          ],
          body: filteredData.map((row) => [
            row.name,
            row.email,
            row.phone,
            row.password,
            row.cpass,
            row.language,
            row.gender,
            row.dob,
          ]),
        });

        doc.save("Student Details.pdf");
      });
    });
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
    XLSX.writeFile(workbook, "UserDetails.xlsx");
  };

  const deleteUserHandler = (user) => {
    dispatch({ type: "SET_DELETE_TARGET", value: user });
    dispatch({ type: "SET_DELETE_DIALOG_VISIBLE", value: true });
  };

  const confirmDelete = async () => {
    if (state.deleteTarget) {
      try {
        const res = await deleteUser(state.deleteTarget.id);
        if (res.status === 200 || res.status === 201) {
          dispatch({
            type: "SET_SELECTED_PRODUCTS",
            value: state.selectedProducts.filter(
              (res) => res.id !== state.deleteTarget.id
            ),
          });
        }
        toast.success("User Data Deleted Successfully !!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        callGetAPI();
      } catch (error) {
        console.error(error);
      } finally {
        dispatch({ type: "SET_DELETE_TARGET", value: null });
        dispatch({ type: "SET_DELETE_DIALOG_VISIBLE", value: false });
      }
    }
  };

  const deleteSelectedUsers = async () => {
    if (state.selectedProducts && state.selectedProducts.length > 0) {
      dispatch({ type: "SET_DELETE_SELECTED_DIALOG_VISIBLE", value: true });
    }
  };

  const confirmDeleteSelected = async () => {
    dispatch({ type: "SET_DELETE_SELECTED_DIALOG_VISIBLE", value: false });

    if (state.selectedProducts && state.selectedProducts.length > 0) {
      const selectedUserIds = state.selectedProducts.map((user) => user.id);
      try {
        await Promise.all(selectedUserIds.map(deleteUser));
        toast.success("Selected Users Deleted Successfully !!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        callGetAPI();
        dispatch({ type: "SET_SELECTED_PRODUCTS", value: [] });
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const callGetAPI = async () => {
    try {
      const users = await getUsers();
      dispatch({ type: "SET_API_DATA", value: users.data });
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch({ type: "SET_API_DATA", value: [] });
    }
  };

  useEffect(() => {
    callGetAPI();
  }, []);

  const navigate = useNavigate();
  const routeChange = () => {
    let path = "/Usereducercreate";
    navigate(path);
  };

  const header = (
    <div className="d-md-flex justify-content-between gap-2">
      <div>
        <h3>USE REDUCER LISTS</h3>
      </div>
      <div className="d-md-flex ">
        <div className="my-auto">
          <Button
            onClick={clearFilters}
            className="pi pi-filter-slash p-button-outlined me-3 p-2"
          >
            <span className="ms-2 ">Clear</span>
          </Button>
        </div>
        <div className="me-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={state.searchText}
              onChange={handleSearch}
              placeholder="Keyword Search"
            />
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center col-10 mx-auto">
      <div className="container datatable-responsive">
        <div className="d-md-flex border shadow justify-content-between p-3 my-3">
          <div className="d-flex justify-content-center">
            <div>
              <Button
                onClick={routeChange}
                className="pi pi-plus p-button-success  me-2 p-3"
              >
                <span className="ms-2">New</span>
              </Button>
            </div>
            <div>
              <Button
                onClick={deleteSelectedUsers}
                className="pi pi-trash p-button-danger p-3"
                disabled={
                  !state.selectedProducts || state.selectedProducts.length === 0
                }
              >
                <span className="ms-2">Delete</span>
              </Button>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-2 mt-md-0">
            <Button
              label=""
              type="button"
              className="mx-1 my-auto"
              icon="pi pi-file-pdf "
              rounded
              severity="warning"
              onClick={() => exportPdf(false)}
              data-pr-tooltip="Export to PDF"
            />
            <Button
              label=""
              type="button"
              className="mx-1 my-auto"
              icon="pi pi-file-excel"
              rounded
              onClick={exportExcel}
              data-pr-tooltip="Export to Excel"
            />
          </div>
        </div>
        <Tooltip target=".export-buttons>button" position="bottom" />

        <DataTable
          ref={dt}
          value={filteredData}
          paginator
          header={header}
          rows={5}
          className="card shadow mb-5"
          rowsPerPageOptions={[5, 10, 25, 50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          columnResizeMode="expand"
          resizableColumns
          showGridlines
          tableStyle={{ minWidth: "50rem" }}
          selectionMode="multiple"
          selection={state.selectedProducts}
          onSelectionChange={(e) =>
            dispatch({ type: "SET_SELECTED_PRODUCTS", value: e.value })
          }
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ width: "25%" }}
          />
          <Column
            field="email"
            header="E-mail"
            sortable
            filter
            filterPlaceholder="Search by email"
            style={{ width: "25%" }}
          />
          <Column
            field="phone"
            header="Phone"
            sortable
            filter
            filterPlaceholder="Search by Phone"
            style={{ width: "25%" }}
          />
          <Column
            field="password"
            header="Password"
            sortable
            filter
            filterPlaceholder="Search by Password"
            style={{ width: "25%" }}
          />
          <Column
            field="cpass"
            header="Confirm Password"
            sortable
            filter
            filterPlaceholder="Search by Confirm Password"
            style={{ width: "25%" }}
          />
          <Column
            field="language"
            header="Language"
            sortable
            filter
            filterPlaceholder="Search by Language"
            style={{ width: "25%" }}
          />
          <Column
            field="gender"
            header="Gender"
            sortable
            filter
            filterPlaceholder="Search by gender"
            style={{ width: "25%" }}
          />
          <Column
            field="dob"
            header="Date of Birth"
            sortable
            filter
            filterPlaceholder="Search by dob"
            style={{ width: "25%" }}
          />
          <Column
            body={(rowData) => (
              <>
                <Link to={`/Usereducercreate/${rowData.id}`}>
                  <Button className="p-button-primary p-2 rounded-pill">
                    <FaPencilAlt />
                  </Button>
                </Link>
                <Button
                  onClick={() => deleteUserHandler(rowData)}
                  className="p-button-danger p-2 rounded-pill ms-2"
                >
                  <FaTrash />
                </Button>
              </>
            )}
            header="Actions"
            style={{ width: "25%" }}
          />
        </DataTable>
        <Dialog
          visible={state.deleteDialogVisible}
          onHide={() =>
            dispatch({ type: "SET_DELETE_DIALOG_VISIBLE", value: false })
          }
          header="Confirm Deletion"
          footer={
            <div>
              <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() =>
                  dispatch({ type: "SET_DELETE_DIALOG_VISIBLE", value: false })
                }
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-danger"
                onClick={confirmDelete}
              />
            </div>
          }
        >
          {state.deleteTarget && (
            <p>
              Are you sure you want to delete the user{" "}
              <strong>{state.deleteTarget.name}</strong>?
            </p>
          )}
        </Dialog>
        <Dialog
          visible={state.deleteSelectedDialogVisible}
          onHide={() =>
            dispatch({
              type: "SET_DELETE_SELECTED_DIALOG_VISIBLE",
              value: false,
            })
          }
          header="Confirm Deletion"
          footer={
            <div>
              <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={() =>
                  dispatch({
                    type: "SET_DELETE_SELECTED_DIALOG_VISIBLE",
                    value: false,
                  })
                }
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-danger"
                onClick={confirmDeleteSelected}
              />
            </div>
          }
        >
          <p>Are you sure you want to delete the selected users ?</p>
        </Dialog>
      </div>
    </div>
  );
}

export default Usereducertable;

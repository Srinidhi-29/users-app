import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import TabPanel from "../components/TabPanel";
import MuiTable from "../components/MuiTable/MuiTable";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  updateForm,
  selectTab,
  updateUserList,
  clearForm,
} from "../actions/userActions";

export default function Home() {
  // State variables declaration
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [errors, setErrors] = useState({});

// Redux state variables
  const form = useSelector((state) => state.form);
  const tab = useSelector((state) => state.tab);
  const userList = useSelector((state) => state.userList);
  const dispatch = useDispatch();

  // Snackbar position
  const vertical = "bottom";
  const horizontal = "right";

  // Function to fetch users data
  const getUsers = () => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => {
        dispatch(updateUserList(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (tab == 0) {
      getUsers();
    }
  }, [tab]);

  // Table columns configuration
  const columns = [
    {
      id: "id",
      numeric: false,
      label: "ID",
    },
    {
      id: "name",
      numeric: true,
      label: "Name",
    },
    {
      id: "email",
      numeric: true,
      label: "Email",
    },
    {
      id: "age",
      numeric: true,
      label: "Age",
    },
    {
      id: "city",
      numeric: true,
      label: "City",
    },
  ];

  const handleSnackBarClose = () => {
    setOpenSnackBar(false);
  };
  
  const handleTabSelect = (event, tabIndex) => {
    dispatch(selectTab(tabIndex));
  };

  const handleFormChange = (field, value) => {
    dispatch(updateForm(field, value));
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  // Function to validate form input
  const findFormErrors = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(form.age) || form.age < 0) {
      newErrors.age = "Invalid age";
    }
    if (!form.city.trim()) {
      newErrors.city = "City is required";
    }
    return newErrors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      axios
        .post("http://localhost:8080/api/users/add", form)
        .then((res) => {
          setSnackBarMessage("User added successfully!")
          setOpenSnackBar(true);
          dispatch(clearForm());
          setErrors({});
        })
        .catch((err) => {
          console.error(err);
          setSnackBarMessage("Something went wrong!")
          setOpenSnackBar(true);
        });
    }
  };

  return (
    <Box>
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={handleTabSelect}
        centered
        indicatorColor="secondary"
        textColor="secondary"
        sx={{ pt: 3 }}
      >
        <Tab label="Users" />
        <Tab label="Add new user" />
      </Tabs>
      {/* Tab Panels */}
      <TabPanel value={tab} index={0}>
        <Paper sx={{ mb: 2, p: 2 }}>
          <MuiTable title="Users" rows={userList} columns={columns} />
        </Paper>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Paper
          sx={{
            mb: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography
              sx={{ flex: "1 1 100%", mb: 2, textAlign: "center" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Add New User
            </Typography>
            {/* Add User Form */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    color="secondary"
                    id="name"
                    label="Name"
                    placeholder="Enter Name"
                    variant="standard"
                    value={form.name}
                    onChange={(e) => handleFormChange("name", e.target.value)}
                    error={Boolean(errors?.name)}
                    helperText={errors?.name}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    fullWidth
                    type="email"
                    color="secondary"
                    id="email"
                    label="Email"
                    placeholder="Enter Email"
                    variant="standard"
                    value={form.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    error={Boolean(errors?.email)}
                    helperText={errors?.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    color="secondary"
                    id="age"
                    label="Age"
                    placeholder="Enter Age"
                    variant="standard"
                    value={form.age}
                    onChange={(e) => handleFormChange("age", e.target.value)}
                    error={Boolean(errors?.age)}
                    helperText={errors?.age}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    color="secondary"
                    id="city"
                    label="City"
                    placeholder="Enter City"
                    variant="standard"
                    value={form.city}
                    onChange={(e) => handleFormChange("city", e.target.value)}
                    error={Boolean(errors?.city)}
                    helperText={errors?.city}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                sx={{ mt: 3, float: "right" }}
              >
                Submit
              </Button>
            </form>
          </Box>
        </Paper>
      </TabPanel>
      {/* Snack bar for notifications */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackBar}
        onClose={handleSnackBarClose}
        message={snackBarMessage}
        key="bottom right"
      />
    </Box>
  );
}

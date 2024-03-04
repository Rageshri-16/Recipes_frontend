import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FeedbackIcon from "@mui/icons-material/Feedback";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextareaAutosize } from "@mui/material";
import { useState } from "react";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import "../../style/globally.css";
import { Form } from "react-bootstrap";

const theme = createTheme();

function FeedBackForm() {
  const [vali, setVali] = useState({
    name: "",
    mobile: "",
    message: "",
    email: "",
  });
  const [emailVal, setEmailVal] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [mobileVal, setMobileVal] = React.useState(false);
  const [feedbackdata, setFeedbackdata] = useState({});

  const changeHandler = (e) => {
    setVali({ ...vali, [e.target.name]: e.target.value });
  };
  // async function handleSubmit(event) {

  //   event.preventDefault();

  //   if (vali.email !== "") {
  //     if (!/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(vali.email)) {
  //       setEmailVal(true);
  //     } else {
  //       setEmailVal(false);
  //     }
  //   }

  //   if (vali.mobile !== "") {
  //     if (vali.mobile.length !== 10) {
  //       setMobileVal(true);
  //     } else {
  //       setMobileVal(false);
  //     }
  //   }

  //   if (
  //     vali.name === "" &&
  //     vali.mobile === "" &&
  //     vali.email === "" &&
  //     vali.message === ""
  //   ) {
  //     setVali({
  //       ...vali,
  //       errorname: "Name is required*",
  //       errormobile: "Mobile is required*",
  //       erroremail: "Email is required*",
  //       errormessage: "Message is required*",
  //     });
  //   } else if (vali.name === "") {
  //     setVali({
  //       ...vali,
  //       errorname: "*Name is required*",
  //     });
  //   } else if (vali.mobile === "") {
  //     setVali({
  //       ...vali,
  //       errormobile: "Mobile is required*",
  //     });
  //   } else if (vali.email === "") {
  //     setVali({
  //       ...vali,
  //       erroremail: "email is required*",
  //     });
  //   } else if (vali.message === "") {
  //     setVali({
  //       ...vali,
  //       errormessage: "Message is required*",
  //     });
  //   } else {
  //     let max = Math.max(...users.map(({ UID }) => UID));

  //     let requestOptions = {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     };
  async function handleSubmit(event) {
    event.preventDefault();

    if (
      vali.email !== "" &&
      !/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(vali.email)
    ) {
      setEmailVal(true);
    } else {
      setEmailVal(false);
    }

    if (vali.mobile !== "" && vali.mobile.length !== 10) {
      setMobileVal(true);
    } else {
      setMobileVal(false);
    }

    if (
      vali.name === "" &&
      vali.mobile === "" &&
      vali.email === "" &&
      vali.message === ""
    ) {
      setVali({
        ...vali,
        errorname: "Name is required*",
        errormobile: "Mobile is required*",
        erroremail: "Email is required*",
        errormessage: "Message is required*",
      });
    } else if (vali.name === "") {
      setVali({
        ...vali,
        errorname: "*Name is required*",
      });
    } else if (vali.mobile === "") {
      setVali({
        ...vali,
        errormobile: "Mobile is required*",
      });
    } else if (vali.email === "") {
      setVali({
        ...vali,
        erroremail: "Email is required*",
      });
    } else if (vali.message === "") {
      setVali({
        ...vali,
        errormessage: "Message is required*",
      });
    } else if (emailVal || mobileVal) {
      // If there are validation errors, return without submitting the form
      return;
    } else {
      // Your existing code for form submission
      let max = Math.max(...users.map(({ UID }) => UID));
      let requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      let resultdata = await fetch(
        `http://localhost:4500/feedback/add?UID=${++max}&Name=${
          vali.name
        }&Phone=${vali.mobile}&Email=${vali.email}&Message=${
          vali.message
        }&Status=false`,
        requestOptions
      );
      let result = await resultdata.json();
      console.log("result", result);
      setOpen(true);
    }
  }

  //     let resultdata = await fetch(
  //       `http://localhost:4500/feedback/add?UID=${++max}&Name=${
  //         vali.name
  //       }&Phone=${vali.mobile}&Email=${vali.email}&Message=${
  //         vali.message
  //       }&Status=false`,
  //       requestOptions
  //     );
  //     let result = await resultdata.json();
  //     console.log("result", result);
  //     setOpen(true);
  //   }
  // }

  const fetchData = () => {
    fetch("http://localhost:4500/feedback/list")
      .then((response) => {
        return response.json();
      })
      .then((getdata) => {
        setUsers(getdata);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-5 ">
      <div className="container border-top border-bottom rounded border-3 border-primary">
        <ThemeProvider theme={theme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <FeedbackIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                FeedBack
              </Typography>
              <Form
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      autoFocus
                      onChange={(e) => changeHandler(e)}
                    />
                    <label style={{ color: "red" }}>{vali.errorname}</label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="mobile"
                      name="mobile"
                      type="number"
                      required
                      fullWidth
                      id="mobile"
                      label="Mobile"
                      autoFocus
                      onChange={(e) => changeHandler(e)}
                    />
                    <label style={{ color: "red" }}>
                      {vali.mobile === ""
                        ? vali.errormobile
                        : mobileVal
                        ? `Mobile is incorrect*`
                        : ""}
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(e) => changeHandler(e)}
                    />
                    <label style={{ color: "red" }}>
                      {vali.email === ""
                        ? vali.erroremail
                        : emailVal
                        ? `Email is incorrect*`
                        : ""}
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextareaAutosize
                      name="message"
                      id="message"
                      label="Message"
                      aria-label="minimum height"
                      required
                      minRows={3}
                      placeholder="Enter Your Feedback..."
                      style={{ width: 400, backgroundColor: "transparent" }}
                      onChange={(e) => changeHandler(e)}
                    />
                    <label style={{ color: "red" }}>{vali.errormessage}</label>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Form>
              <Collapse in={open} style={{ width: "717px", marginTop: "7px" }}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  <label>Your Feddback Submited!!!</label>
                </Alert>
              </Collapse>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </div>
  );
}
export default FeedBackForm;

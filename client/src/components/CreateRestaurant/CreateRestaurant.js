import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import * as Yup from "yup";
import _omit from "lodash-es/omit";
import { Formik } from "formik";
import { restaurant, toast, user } from "../../redux/actions";

const CreateRestaurant = (props) => {
  const {
    handleClose,
    classes,
    open,
    createRestaurant,
    showToast,
    getUsers,
    users,
    me
  } = props;

  useEffect(() => {
    if (me.role === "admin")
      getUsers({
        params: {
          all: true
        }
      });
  }, []);

  const validation = Yup.object().shape({
    name: Yup.string().required("Restaurnt name is required."),
    user: me.role === "admin" ? Yup.string().required("User is required") : null
  });

  const handleSubmit = (values, actions) => {
    handleClose();

    if (me.role !== "admin") {
      values = _omit(values, ["user"]);
    }

    createRestaurant({
      body: values,
      success: () => {
        actions.setSubmitting(false);
        showToast({
          message: "You successfully added a restaurant!",
          intent: "success",
          timeout: 3000
        });
      },
      fail: err => {
        actions.setSubmitting(false);
        showToast({
          message: err.response.data.message,
          intent: "error"
        });
      }
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <Formik
        initialValues={{ name: "", user: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {props => {
          return (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <DialogTitle id="form-dialog-title">
                Create restaurant
              </DialogTitle>
              <DialogContent className={classes.dialog}>
                <DialogContentText>
                  Please input the restaurant name.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  name="name"
                  label="Restaurant Name"
                  type="text"
                  className={classes.textField}
                  fullWidth
                  rows="5"
                  variant="outlined"
                  value={props.values.name}
                  onChange={props.handleChange}
                  error={props.errors.name && props.touched.name}
                  helperText={
                    props.errors.name && props.touched.name && props.errors.name
                  }
                />
                {me.role === "admin" && (
                  <TextField
                    id="user"
                    name="user"
                    fullWidth
                    select
                    label="user"
                    className={classes.user}
                    value={props.values.user}
                    onChange={props.handleChange}
                    SelectProps={{
                      native: true
                    }}
                    error={props.errors.user && props.touched.user}
                    helperText={
                      props.errors.user &&
                      props.touched.user &&
                      props.errors.user
                    }
                    variant="outlined"
                  >
                    <option value=""></option>
                    {users.map(user => (
                      <option value={user._id}>
                        {user.firstName} {user.lastName} ({user.email})
                      </option>
                    ))}
                  </TextField>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary" vairant="contained">
                  Save
                </Button>
              </DialogActions>
            </form>
          );
        }}
      </Formik>
    </Dialog>
  );
}

const mapStateToProps = state => ({
  users: state.user.users,
  me: state.auth.me
});

const mapDispatchToProps = {
  createRestaurant: restaurant.createRestaurant,
  showToast: toast.showToast,
  getUsers: user.getUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRestaurant);

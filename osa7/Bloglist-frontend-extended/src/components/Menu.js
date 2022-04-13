import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Toolbar, AppBar, Button } from "@material-ui/core";
import { logout } from "../reducers/loginReducer";

function Menu() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login);

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(logout());
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user === null ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <div style={{ flex: 1, textAlign: "right" }}>
              {user.name} logged-in
              <button
                style={{ margin: "10px" }}
                type="button"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Menu;

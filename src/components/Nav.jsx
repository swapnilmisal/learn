import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ShowChart from "@material-ui/icons/ShowChart";
import Search from "@material-ui/icons/Search";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    justifyItems: "center",
    backgroundColor: "pink",
    padding: "1em .5em",
    margin: "1em .5em"
  }
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function RenderRedirect() {
    if (value) return <Redirect to="/search" />;
    return <Redirect to="/" />;
  }

  return (
    <div>
      <RenderRedirect />
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <BottomNavigationAction label="Chart" icon={<ShowChart />} />
        <BottomNavigationAction label="Search" icon={<Search />} />
      </BottomNavigation>
    </div>
  );
}

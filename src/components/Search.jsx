import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";

const currencies = [
  {
    value: "usd",
    label: "$"
  },
  {
    value: "btc",
    label: "฿"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));

function Search(props) {
  let [currency, setCurrency] = useState("usd");
  let [searchField, setSearchField] = useState(0);
  let [srchArr, setSrchArr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let state = [...props.state];
    if (isNaN(searchField) || !(props.state && props.state.length)) {
      setSrchArr(null);
    } else if (state && state.length > 2) {
      let tempArr = [];
      for (let step = 0; step < 3; step++) {
        let valArr = state.map(element => element[currency]);
        let closest = valArr.reduce(function(prev, curr) {
          return Math.abs(curr - searchField) < Math.abs(prev - searchField)
            ? curr
            : prev;
        });

        tempArr.push(state.find(element => element[currency] === closest));
        state = state.filter(element => element[currency] !== closest);
      }
      setSrchArr([...tempArr]);
    }
  }, [[...props.state], searchField]);

  return (
    <>
      <div
        style={{
          padding: "1em 1em",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        <TextField
          id="outlined-search"
          label="Search field"
          type="search"
          className={classes.textField}
          onChange={event => setSearchField(event.target.value)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          className={classes.textField}
          value={currency}
          onChange={event => setCurrency(event.target.value)}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Please select your currency"
          margin="normal"
          variant="outlined"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        {srchArr &&
          srchArr.length > 0 &&
          srchArr.map(element => (
            <div
              key={element.usd}
              style={{
                display: "grid",
                padding: ".5em",
                margin: ".20em",
                gridTemplateColumns: "2fr 1fr 1fr",
                alignContent: "space-around",
                backgroundColor: "pink",
                justifyContent: "space-evenly",
                alignItems: "flex-start"
              }}
            >
              <div>
                <h3>Hash:</h3>
                <p>{element.hash}</p>
              </div>
              <div>
                <h3>USD: </h3>
                <p>{element.usd}</p>
              </div>
              <div>
                <h3> BTC: </h3>
                <p>{element.btc}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
const mapStateToProps = state => ({
  state: state
});

export default connect(mapStateToProps)(Search);

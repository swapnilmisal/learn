import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600
  },
  snackbar: {
    margin: theme.spacing(1)
  }
}));

function Snack(props) {
  const classes = useStyles();
  let ws = new WebSocket("wss://ws.blockchain.info/inv");
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    let rate;
    let prom = fetch("https://api.cryptonator.com/api/ticker/btc-usd")
      .then(res => res.json())
      .then(data => data.ticker.price)
      .catch(console.log);
    prom.then(result => (rate = result));

    ws.addEventListener("close", () => setStatus("Closed"));
    ws.addEventListener("open", () => setStatus("Connected"));
    ws.onopen = () => subscribe();
    ws.onmessage = msg => insert(msg, rate);
    return () => unsubscribe();
  });
  function insert(msg, rate) {
    let allData = JSON.parse(msg.data);
    allData = allData.x;
    let data = allData.out.map(data => {
      let conVal = data.value / 10 ** 8;
      return {
        hash: allData.hash,
        time: allData.time,
        usd: conVal * rate,
        btc: conVal
      };
    });
    data = data.filter(element => element.btc >= 1);

    if (data.length > 0) {
      props.add({
        data: data,
        type: "ADD"
      });
    }
  }
  function unsubscribe() {
    let data = JSON.stringify({ op: "unconfirmed_unsub" });
    ws.send(data);
  }

  function subscribe() {
    let data = JSON.stringify({ op: "unconfirmed_sub" });
    ws.send(data);
  }
  return (
    <div>
      <SnackbarContent
        className={classes.snackbar}
        message={`Status: ${status}`}
      />
    </div>
  );
}
const mapStateToProps = state => ({
  //state: state
});

const mapDispatchToProps = dispatch => {
  return {
    add: action => dispatch(action)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Snack);

import Card from "../../components/ui/Card";

const RecordEntry = (props) => {
  return (
    <>
      <h1>Pain Scale: {props.painScale || "none"}</h1>
    </>
  );
};

export default RecordEntry;

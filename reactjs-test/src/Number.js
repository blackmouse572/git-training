function Number({value, label}) {
  return(
    <li className="info">
      <p className="number">{String(value).padStart(2, "0")}</p>
      <p className="unit">{label}</p>
    </li>
  );
}
export default Number;

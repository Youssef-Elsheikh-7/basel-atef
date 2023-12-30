/* eslint-disable react/prop-types */

import { ProgressBar } from "primereact/progressbar";

export default function Progress({ value }) {
  return (
    <div className="card">
      <ProgressBar value={value}></ProgressBar>
    </div>
  );
}

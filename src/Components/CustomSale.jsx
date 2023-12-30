/* eslint-disable react/prop-types */

import { motion } from "framer-motion";

export default function CustomSale({ img, head, info, name, price }) {

  //   const [time, setTime] = useState("");
  //   let time;
  //   const timer = createCountdown(
  //     { h: h, m: m, s: s },
  //     {
  //       listen: ({ hh, mm, ss }) => {
  //         time = `${hh}:${mm}:${ss}`;

  //       },
  //     }
  //   );
  //   timer.start();
  //   //   setTimeout(() => {
  //   //     timer.reset();
  //   //   }, 1440);

  return (
    <div
      className={name}
    >
      <div className="info">
        <h4>{head}</h4>
        <p dangerouslySetInnerHTML={{__html: info}}></p>
        {/* <p>{price}LE</p> */}
      </div>
      <img src={`${img}`} alt="" />
    </div>
  );
}

// import { FormikProps } from "formik";
// import React from "react";
// import { AttendanceFormProps } from "../../app/models";

// interface Props {
//   id: string;
//   groupName: string;
//   label: string;
//   labelProps?: string;
//   formik: FormikProps<AttendanceFormProps>;
//   index: number;
//   value: string | undefined;
// }

// const RadioButton: React.FC<Props> = ({
//   id,
//   label,
//   groupName,
//   labelProps,
//   formik,
//   index,
//   value,
// }) => {
//   return (
//     <div className="flex items-center">
//       <input
//         id={id}
//         type="radio"
//         name={groupName}
//         value={value}
//         className="hidden -z-10"
//         onChange={
//           formik.values.attendingList[index] !== undefined
//             ? formik.handleChange(`attendingList[${index}].isAttending`)
//             : formik.handleChange(``)
//         }
//       />
//       <label
//         htmlFor={id}
//         className={`border-thin border-black rounded-lg cursor-pointer w-32 px-10 py-2 text-sm font-medium ${
//           formik.values.attendingList![index] !== undefined
//             ? formik.values.attendingList![index].isAttending === "decline" &&
//               formik.values.attendingList![index].isAttending === value
//               ? "bg-red-400 text-white"
//               : formik.values.attendingList![index].isAttending === "accept" &&
//                 formik.values.attendingList![index].isAttending === value
//               ? "bg-green-400 text-white"
//               : "bg-transparent text-black"
//             : ""
//         } ${labelProps}`}
//         onClick={() => `${value} label clicked`}
//       >
//         {label}
//       </label>
//     </div>
//   );
// };

// export default RadioButton;

import React from "react";

const RadioButton = () => {
  return <div>RadioButton</div>;
};

export default RadioButton;

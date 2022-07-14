// import React, { memo } from "react";
// import useAxios from "axios-hooks";
// import useMounterdRef from "../hooks/useMounterdRef";

// const Pasing = memo(() => {
//   const [{ data }] = useAxios("http://localhost:3001/AA");
//   const mountedRef = useMounterdRef();

//   console.log(data);

//   const [sliceData, setSliceData] = React.useState([]);

//   // React.useEffect(() => {
//   //   setSliceData(
//   //     data &&
//   //       data.map((v, i) => {
//   //         return { addr: v.statn_addr1, id: v.lendplace_id };
//   //       })
//   //   );
//   // }, [data]);

//   // console.log(sliceData);

//   const [{ loading }, refetch] = useAxios(
//     {
//       url: "http://localhost:3001/AA",
//       method: "POST",
//     },
//     { manual: true }
//   );

//   // React.useEffect(() => {
//   //   if (mountedRef.current) {
//   //     let json = null;
//   //     (async () => {
//   //       try {
//   //         const response = await refetch({
//   //           data: [sliceData],
//   //         });
//   //         json = response.data;
//   //       } catch (e) {
//   //         window.alert("저장 실패");
//   //       }
//   //       if (json !== null) {
//   //         window.alert("저장 성공");
//   //         console.log(json);
//   //       }
//   //     })();
//   //   }
//   // }, [mountedRef, refetch, sliceData]);

//   return <div></div>;
// });

// export default Pasing;

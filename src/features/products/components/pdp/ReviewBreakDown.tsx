
// export function RatingBreakDown({ reviews }) {
//   const stats = getRatingStats(reviews)

//   return (
//     <div className="flex flex-col gap-2 w-full max-w-md">
//       {stats.map((item) => (
//         <div key={item.star} className="flex items-center gap-3">
          
//           {/* Label */}
//           <span className="w-12 text-sm">{item.star} Stars</span>

//           {/* Bar background */}
//           <div className="flex-1 h-3 bg-gray-300 rounded-full overflow-hidden">
            
//             {/* Bar fill */}
//             <div
//               className="h-full bg-pink-500 rounded-full transition-all duration-300"
//               style={{ width: `${item.percent}%` }}
//             />
//           </div>

//         </div>
//       ))}
//     </div>
//   )
// }
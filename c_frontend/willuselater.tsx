// return (
//     <div>
//       <h1 className="create-server">Create Server</h1>
//       <div>
//         <label className="label-servername">
//           Server Name:
//           <input
//             type="text"
//             className="input-servername"
//             value={serverName}
//             onChange={(e) => setServerName(e.target.value)}
//           />
//         </label>
//       </div>
//       <div>
//         <label className="label-servercategory">
//           Server Category:
//           <select
//             className="input-servercategory"
//             value={serverCategory}
//             onChange={(e) => setServerCategory(e.target.value)}
//           >
//             <option value="Education">Education</option>
//             <option value="Tech">Tech</option>
//             <option value="Entertainment">Entertainment</option>
//             <option value="Casual">Casual</option>
//             <option value="Music">Music</option>
//             <option value="Gaming">Gaming</option>
//             <option value="Movies">Movies</option>
//             <option value="Singing">Singing</option>
//             <option value="Sports">Sports</option>
//             <option value="Travel">Travel</option>
//           </select>
//         </label>
//       </div>
//       <div>
//         <button className="btn-createserver" onClick={handleCreateServer}>
//           Create Server
//         </button>
//       </div>
//     </div>
//   );

//   CSS:
  
// div {
//     margin: 20px; 
//   }
  

//   h1.create-server {
//     font-size: 24px;
//     color: #333;
//   }
  

//   .label-servername,
//   .label-servercategory {
//     margin-bottom: 10px;
//     display: block;
//   }
  

//   .input-servername,
//   .input-servercategory {
//     width: 100%;
//     padding: 8px;
//     margin-top: 5px;
//     box-sizing: border-box;
//   }
  

//   .btn-createserver {
//     padding: 10px 15px;
//     background-color: #3498db;
//     color: #fff;
//     border: none;
//     cursor: pointer;
//   }
  

//   .btn-createserver:hover {
//     background-color: #2980b9;
//   }
  
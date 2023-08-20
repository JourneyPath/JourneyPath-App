// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const PromptForm = () => {
// 	const [role, setRole] = useState("");
// 	const [action, setAction] = useState("");
// 	const [dueDate, setDueDate] = useState("");

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		await dispatch(
// 			editUser({
// 				role,
// 				action,
// 				dueDate,
// 			})
// 		);
//      	setRole("");
//      	setAction("");
// 		setDueDate("");
// 	};

// 	return (
// 		<div className="promptForm-shell">
// 			<div className="promptForm-mainWrapper">
// 				<li>
// 					<h2>Answer the following questions to get started</h2>
// 				</li>

// 				<form className="promptForm-wrapper" onSubmit={handleSubmit}>

// 					<label htmlFor="role">What is your role/position?</label>
// 					<input
// 						name="role" 
// 						value={role}
// 						placeholder='ex: "Software Engineer", "College Student", "Stay at Home Parent"'
// 						onChange={(e) => setRole(e.target.value)}
// 					/>

// 					<label htmlFor="action">What action would you like to create an action plan for?</label>
// 					<input
// 						name="action" 
// 						value={action}
// 						placeholder="ex: 'Launch a new product', 'Write my senior thesis', 'Learn to code'"
// 						onChange={(e) => setAction(e.target.value)}
// 					/>

// 					<label htmlFor="dueDate">When does this need to be completed by?</label>
// 					<input
// 						name="dueDate" 
// 						value={dueDate}
// 						placeholder="ex: 'In one month', 'By 12/31/2024', 'Next Thursday'"
// 						onChange={(e) => setDueDate(e.target.value)}
// 					/>

// 					<br />
// 					<div className="button-box">
// 						<button className="submitBtn" type="submit">Submit Changes</button>

// 						{/* <button className="deleteBtn" onClick={handleDelete}>Delete</button> */}
// 					</div>
// 				</form>
// 			</div>
// 		</div>	
// 	);
// };

// export default PromptForm;

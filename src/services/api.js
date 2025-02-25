import Register from "../Components/Register";

const API_URL="http://localhost:5000";

// Register User
export const registerUser=async(userData)=>{
    const res=await fetch(`${API_URL}/employees`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(userData),
    });
    return res.json();
};

//Login User
 export  const loginUser=async(email,password)=>{
 const res=await fetch(`${API_URL}/employees`);
 const users=await res.json();
 const user=users.find(u=>u.email===email && u.password===password);


//Token storage in LocalStage
if (user) {
    const token=JSON.stringify({name:user.name,email:user.email});
    localStorage.setItem("token",token);
    return {success:true,token};
}else{
    return {success:false}
};
 };

 
//Fetch Employee
export const  fetchEmployees=async()=>{
   try{ 
   const response=await fetch("http://localhost:5000/employees");
   if(!response.ok) throw new Error('Failed to fetch Employees.');
   const data=await response.json();
   console.log("Fetched Employee:",data);
   return data; 
}catch(error){
    console.error("API Error",error);
    return[];
    
}
}

//Add Employee
export const addEmployee=async(employee)=>{
 const res=await fetch(`${API_URL}/employees`,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(employee)
 });
 return res.json();
};

//Delete Employee
export const deleteEmpoyee=async(id)=>{
    await fetch(`${API_URL}/employees/${id}`,
        {method:'DELETE'} );

};

//Update Employee
export const updateEmployee = async(id,updateData)=>{
    await fetch(`${API_URL}/employees/${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(updateData),
    });
}
import React from "react";
import { useEffect,useState } from "react";
import { deleteEmpoyee, fetchEmployees, updateEmployee } from "../services/api";
import { data } from "react-router-dom";

const ShowData =()=>{
    const[employees,setEmployees]=useState([]);

    useEffect(()=>{
        fetchEmployees()
       .then((data)=>{
        console.log("Setting Employees state",data);
        setEmployees(data);
        }).catch((error)=>{
            console.log(`Failed to Fetch Data..${error}`);
            
        });

    },[]);


    const handleDelete=async(id)=>{
        await deleteEmpoyee(id);
        setEmployees(employees.filter(emp=>emp.id !==id));
    }

    const handleUpdate=async (id,updateData)=>{
        await updateEmployee(id,updateData);
        setEmployees(employees.map(emp=>(emp.id===id)?{...emp,
            ...updateData
        }:emp))
    };

    return (
        <section className="container">
            <table className="table table-borderd mt-3">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Department</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                { employees.length > 0 ? (
                    employees.map(emp=>(
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.password}</td>
                            <td>{emp.department}</td>
                            <td>
                            <button className="btn btn-primary me-3" onClick={()=>handleUpdate(emp)}>Edit</button>
                            <button className="btn btn-danger" onClick={()=>handleDelete(emp.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ):(
                    <tr>
                        <td colSpan={4} className="text-danger">No Employees Found</td>
                    </tr>
                )}
            </tbody>
            </table>
        </section>
    )
}
export default ShowData;
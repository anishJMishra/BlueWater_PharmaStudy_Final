import React, {useState, useEffect} from "react";
import "./PatientTable.css";
import { Button } from "@mui/material";
import useJaneHopkins from "../hooks/useJaneHopkins";
import StudyProgress from "./StudyProgress";


const DropdownMenu = ({ options }) => {

  const [selectedStudy, setSelectedStudy] = useState(null);
 
 
  const handleSelectOption = (event) => {
    const optionId = event.target.value;
    const selected = options.find((option) => option.studyName === optionId);
    setSelectedStudy(selected);
  };
  

  return (
    
    <div className = "pbar">
      <h1>Select a Study to View Progress Bar</h1>
      <select onChange={handleSelectOption}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.studyName} value={option.studyName}>
            {option.studyName}
          </option>
        ))}
      </select>
      
      {selectedStudy && (
        <p>Selected option: {selectedStudy.studyName}</p>
      )}

      {selectedStudy && <StudyProgress studyStatus = {selectedStudy}/>}
      
          
    </div>
  );

};

const StudyDropdown = () => {
  const { entities } = useJaneHopkins();
  const [loading, setLoading] = useState(true);
  const [study, setStudy] = useState([]);
  useEffect(() => {
    const fetchStudy = async () => {
      try {
        const response = await entities.drug.list();
        //console.log("Response:", response);
        setStudy(response.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    fetchStudy();
  }, [entities]);

  return (
    <div>
      <DropdownMenu options={study} />
    </div>
  );
};

export default StudyDropdown;

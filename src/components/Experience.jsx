import { v4 as uuid } from 'uuid';
import '../styles/App.css'

export default function Experience(
  { isOpen, company, position, expStartDate, expEndDate, expLocation, expDesc, updateValue, 
    setJobs, jobs, resetExperience, setIsExpPreview, expLogo, dropdown, updateOpen, isEdit, editIndex, setIsEdit
  }) {

  if (!isOpen) return;

  const fields = [
    { label: "Company", placeholder: "Enter company name", key: uuid(), state: "company", value: company },
    { label: "Position", placeholder: "Enter position title", key: uuid(), state: "position", value: position },
    { label: "Start Date", placeholder: "Enter start date", key: uuid(), state: "expStartDate", value: expStartDate },
    { label: "End Date", placeholder: "Enter end date", key: uuid(), state: "expEndDate", value: expEndDate },
    { label: "Location", placeholder: "Enter location", key: uuid(), state: "expLocation", value: expLocation },
    { label: "Description", placeholder: "Enter role description", key: uuid(), state: "expDesc", value: expDesc }
  ];

  function handleAddJob(e) {
    e.preventDefault();
    const experience = {
      id: uuid(),
      company: company,
      position: position,
      expStartDate: expStartDate,
      expEndDate: expEndDate,
      expLocation: expLocation,
      expDesc: expDesc,
    }
    if (!isEdit) {
      setJobs((prevJobs) => [...prevJobs, experience]);
    } else {
      const jobsCopy = Array.from(jobs);
      jobsCopy[editIndex] = experience;
      setJobs(jobsCopy);
    }
    setIsEdit(false);
    resetExperience();
  }

  function handleClick(e) {
    e.preventDefault();
    updateOpen("isExpOpen");
  }

  function handleChange(e) {
    e.preventDefault();
    updateValue(e.target.value, e.target.id);
    setIsExpPreview(!isEdit);
  }

  return (
    <div className="experience">
      <div className="expInputHeader" onClick={handleClick}>
        <img src={expLogo} id="sectionLogo" />
        <h2>Experience</h2>
        <img src={dropdown} id="sectionDropdown" />
      </div>
      <div>
        {fields.map((field) => {
          return (
            <div key={field.state} className="entry">
              <label htmlFor={field.state} > {field.label} </label>
              <input type="text" name={field.state} className="experienceInput" placeholder={field.placeholder}
               id={field.state} value={field.value} onChange={handleChange} />
            </div>
          )
        })}
      </div>
      <div className="buttons">
        <button id="cancel" onClick={resetExperience}>
          Cancel
        </button>
        <button id="addExp" onClick={handleAddJob}>
          Save
        </button>
      </div>
    </div>
  )
}
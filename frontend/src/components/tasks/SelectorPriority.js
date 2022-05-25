import React, { useEffect, useState} from "react";
import { useUserContext } from '../../context/userContext';
import getPriority from '../../data/priorityService';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormSelect
} from "shards-react";

const SelectorPriority = () => {

  const [priority, setPriority] = useState();
  const [value, setValue] = useState("");
  const { uid } = useUserContext();
  const priorities = [];

  getPriority(uid).then(response => {
    if (priorities.length == 0) {
      for (const doc of response.data) {
        priorities.push(doc);
        if (doc.id == 0) setValue(doc["Name"]);
      }
    }
  })

  useEffect(() => {
    let mounted = true;
    setTimeout(() => {
      if(mounted) {
        setPriority(priorities);
      } 
    }, 100);

    return () => mounted = false;
  }, [])

  const handleSetPriority = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
    console.log(value);
  }

  return (
    <>
      <div>
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Приоритет</InputGroupText>
          </InputGroupAddon>
          <FormSelect onChange={handleSetPriority}>
            { priority && priority.length ?
              priority.map((pr, idx) => (<option key={idx}>{pr["Name"]}</option>)
            ) : null }
          </FormSelect>
        </InputGroup>
      </div>
    </>
  )
};

export default SelectorPriority;

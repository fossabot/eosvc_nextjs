import { useState } from "react";

export function useForm(initialFValues) {
  const [values, setValues] = useState(initialFValues);

  const handleInputChange = (e) => {
    //e.preventDefault();
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return { values, setValues, handleInputChange };
}

export function Form(props) {
  return <form className="p-5">{props.children}</form>;
}
